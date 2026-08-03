'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useClient } from 'sanity'
import {
  Card,
  Flex,
  Box,
  Stack,
  Text,
  Heading,
  Button,
  Select,
  Spinner,
  Badge,
  Inline,
  Grid,
} from '@sanity/ui'
import {
  UploadIcon,
  CheckmarkIcon,
  CloseIcon,
  ImageIcon,
  TrashIcon,
  RefreshIcon,
  ArrowRightIcon,
} from '@sanity/icons'

interface PhotographyCategory {
  _id: string
  title: string
}

interface QueuedFile {
  id: string
  file: File
  previewUrl: string
  title: string
  altText: string
  status: 'pending' | 'uploading' | 'completed' | 'failed'
  error?: string
}

/**
 * Converts a raw filename into a clean Title and Alt Text according to Phase E.1 specs.
 *
 * Examples:
 * - IMG_2034.jpg (Wedding Photography) => Title: "IMG 2034", Alt: "Wedding photograph IMG 2034"
 * - muslim_wedding_001.webp (Muslim Wedding Photography) => Title: "Muslim Wedding 001", Alt: "Muslim wedding photograph Muslim Wedding 001"
 * - haldi-ceremony-final-08.jpg (Haldi Ceremony Photography) => Title: "Haldi Ceremony Final 08", Alt: "Haldi ceremony photograph Haldi Ceremony Final 08"
 */
export function generateMetadataFromFilename(filename: string, categoryTitle?: string) {
  const withoutExt = filename.replace(/\.[^/.]+$/, '')
  const spaced = withoutExt.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()

  const cleanTitle = spaced
    .split(' ')
    .map((word) => {
      if (/^\d+$/.test(word)) return word
      if (word.toUpperCase() === 'IMG') return 'IMG'
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')

  let categoryPrefix = 'Photography'
  if (categoryTitle) {
    const baseCat = categoryTitle.replace(/\s+Photography$/i, '').trim()
    const words = baseCat.split(' ')
    if (words.length > 0) {
      const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      const restWords = words.slice(1).map((w) => w.toLowerCase()).join(' ')
      categoryPrefix = restWords ? `${firstWord} ${restWords}` : firstWord
    }
  }

  const altText = `${categoryPrefix} photograph ${cleanTitle}`

  return { title: cleanTitle, altText }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function BulkImageUploader() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [categories, setCategories] = useState<PhotographyCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [currentFilename, setCurrentFilename] = useState('')
  const [uploadedCount, setUploadedCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [failedFiles, setFailedFiles] = useState<{ filename: string; error: string }[]>([])
  const [uploadFinished, setUploadFinished] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    let isSubscribed = true
    async function fetchCategories() {
      try {
        const result = await client.fetch<PhotographyCategory[]>(
          `*[_type == "photographyCategory"] | order(title asc) {_id, title}`
        )
        if (isSubscribed) {
          setCategories(result || [])
          if (result && result.length > 0) {
            setSelectedCategoryId(result[0]._id)
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        if (isSubscribed) setLoadingCategories(false)
      }
    }
    fetchCategories()
    return () => {
      isSubscribed = false
    }
  }, [client])

  const selectedCategoryObj = categories.find((c) => c._id === selectedCategoryId)
  const selectedCategoryTitle = selectedCategoryObj ? selectedCategoryObj.title : ''

  // Process newly selected or dropped files
  const handleFilesAdded = useCallback(
    (files: FileList | File[]) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      const newItems: QueuedFile[] = []

      Array.from(files).forEach((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        const isValidExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
        const isValidMime = allowedTypes.includes(file.type) || file.type === ''

        if (isValidExt && isValidMime) {
          const { title, altText } = generateMetadataFromFilename(file.name, selectedCategoryTitle)
          newItems.push({
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            file,
            previewUrl: URL.createObjectURL(file),
            title,
            altText,
            status: 'pending',
          })
        }
      })

      if (newItems.length > 0) {
        setQueuedFiles((prev) => [...prev, ...newItems])
        setUploadFinished(false)
      }
    },
    [selectedCategoryTitle]
  )

  // Re-generate title/alt text if category changes for pending files
  useEffect(() => {
    setQueuedFiles((prev) =>
      prev.map((item) => {
        if (item.status === 'pending') {
          const { title, altText } = generateMetadataFromFilename(item.file.name, selectedCategoryTitle)
          return { ...item, title, altText }
        }
        return item
      })
    )
  }, [selectedCategoryTitle])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files)
    }
  }

  const removeQueuedFile = (id: string) => {
    setQueuedFiles((prev) => {
      const item = prev.find((f) => f.id === id)
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const clearQueue = () => {
    queuedFiles.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl)
    })
    setQueuedFiles([])
    setUploadFinished(false)
    setUploadedCount(0)
    setFailedCount(0)
    setFailedFiles([])
  }

  // Start uploading queue
  const startUpload = async () => {
    if (!selectedCategoryId) {
      alert('Please select an Associated Category before uploading.')
      return
    }
    if (queuedFiles.length === 0) return

    setIsUploading(true)
    setUploadFinished(false)
    setUploadedCount(0)
    setFailedCount(0)
    setFailedFiles([])

    const pendingFiles = [...queuedFiles]
    let successCount = 0
    let failCount = 0
    const failures: { filename: string; error: string }[] = []

    for (let i = 0; i < pendingFiles.length; i++) {
      const item = pendingFiles[i]
      setCurrentFileIndex(i + 1)
      setCurrentFilename(item.file.name)

      // Update status to uploading
      setQueuedFiles((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading' } : q))
      )

      try {
        // 1. Upload image asset to Sanity
        const asset = await client.assets.upload('image', item.file, {
          filename: item.file.name,
          contentType: item.file.type || 'image/jpeg',
        })

        // 2. Metadata generation
        const { title, altText } = generateMetadataFromFilename(item.file.name, selectedCategoryTitle)

        // 3. Create published photographyImage document (no 'drafts.' prefix => published immediately)
        const doc = {
          _type: 'photographyImage',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
          category: {
            _type: 'reference',
            _ref: selectedCategoryId,
          },
          title,
          altText,
        }

        await client.create(doc)

        successCount++
        setUploadedCount(successCount)
        setQueuedFiles((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'completed' } : q))
        )
      } catch (err: any) {
        console.error(`Error uploading ${item.file.name}:`, err)
        failCount++
        setFailedCount(failCount)
        const errMsg = err?.message || 'Failed to upload asset or create document'
        failures.push({ filename: item.file.name, error: errMsg })
        setFailedFiles([...failures])

        setQueuedFiles((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'failed', error: errMsg } : q))
        )
      }
    }

    setIsUploading(false)
    setUploadFinished(true)
  }

  const navigateToUploadedPhotos = () => {
    window.location.href = `${window.location.origin}/studio/structure/portfolioAndPhotoCollections;uploadedPhotos`
  }

  const resetForm = () => {
    clearQueue()
  }

  const totalFiles = queuedFiles.length
  const progressPercent = totalFiles > 0 ? Math.round((currentFileIndex / totalFiles) * 100) : 0

  return (
    <Box padding={4} style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Stack space={4}>
        {/* Header Banner */}
        <Card padding={4} radius={3} tone="primary">
          <Flex align="center" justify="space-between">
            <Stack space={2}>
              <Heading size={2}>📤 Bulk Image Upload Manager</Heading>
              <Text size={1} muted>
                Batch import 50–500 wedding/event photos at once. Select an Associated Category to automatically populate published photographyImage documents.
              </Text>
            </Stack>
            {queuedFiles.length > 0 && !isUploading && (
              <Button icon={TrashIcon} text="Clear Queue" mode="ghost" tone="critical" onClick={clearQueue} />
            )}
          </Flex>
        </Card>

        {/* Step 1: Batch Metadata Assignment */}
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Heading size={1}>1. Associated Category Assignment</Heading>
            <Text size={1} muted>
              Choose the category to automatically assign to every photo in this upload batch.
            </Text>

            {loadingCategories ? (
              <Flex gap={2} align="center">
                <Spinner muted />
                <Text size={1}>Loading Photography Categories...</Text>
              </Flex>
            ) : categories.length === 0 ? (
              <Card padding={3} tone="caution" radius={2}>
                <Text size={1}>
                  ⚠️ No Photography Categories found. Please create a category under 📁 Category Galleries first.
                </Text>
              </Card>
            ) : (
              <Box style={{ maxWidth: '400px' }}>
                <Select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.currentTarget.value)}
                  disabled={isUploading}
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Select>
              </Box>
            )}
          </Stack>
        </Card>

        {/* Step 2: Multi-file Dropzone */}
        {!uploadFinished && (
          <Card
            padding={5}
            radius={3}
            shadow={1}
            tone={isDragging ? 'primary' : 'default'}
            style={{
              border: isDragging ? '2px dashed var(--card-focus-ring-color)' : '2px dashed var(--card-border-color)',
              textAlign: 'center',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files)
                  e.target.value = ''
                }
              }}
              disabled={isUploading}
            />

            <Flex direction="column" gap={3} align="center">
              <Box style={{ fontSize: '2.5rem', opacity: 0.8 }}>
                <UploadIcon />
              </Box>
              <Stack space={1}>
                <Heading size={1}>
                  {isDragging ? 'Drop images here...' : 'Click to select or drag & drop images'}
                </Heading>
                <Text size={1} muted>
                  Supports multi-selection of JPG, JPEG, PNG, and WEBP files.
                </Text>
              </Stack>
            </Flex>
          </Card>
        )}

        {/* Live Upload Progress UI */}
        {isUploading && (
          <Card padding={4} radius={3} tone="primary" shadow={1}>
            <Stack space={3}>
              <Flex justify="space-between" align="center">
                <Text size={2} weight="bold">
                  Uploading {currentFileIndex} / {totalFiles}
                </Text>
                <Badge tone="primary">{progressPercent}%</Badge>
              </Flex>

              {/* Progress Bar */}
              <Box
                style={{
                  width: '100%',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: '#2275d7',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>

              <Flex gap={2} align="center">
                <Spinner />
                <Text size={1} style={{ fontStyle: 'italic' }}>
                  Processing: {currentFilename}
                </Text>
              </Flex>
            </Stack>
          </Card>
        )}

        {/* Step 3: Queue & Metadata Preview Table */}
        {queuedFiles.length > 0 && !uploadFinished && (
          <Card padding={4} radius={3} shadow={1}>
            <Stack space={4}>
              <Flex justify="space-between" align="center">
                <Heading size={1}>Selected Photos ({queuedFiles.length})</Heading>
                {!isUploading && (
                  <Button
                    icon={UploadIcon}
                    text={`Start Bulk Upload (${queuedFiles.length} Photos)`}
                    tone="primary"
                    onClick={startUpload}
                    disabled={!selectedCategoryId}
                  />
                )}
              </Flex>

              <Grid columns={[1, 1, 2]} gap={3}>
                {queuedFiles.map((item) => (
                  <Card key={item.id} padding={2} radius={2} border shadow={1}>
                    <Flex gap={3} align="center">
                      <Box
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          backgroundColor: '#000',
                          flexShrink: 0,
                        }}
                      >
                        {item.previewUrl ? (
                          <img
                            src={item.previewUrl}
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Flex align="center" justify="center" style={{ height: '100%' }}>
                            <ImageIcon />
                          </Flex>
                        )}
                      </Box>

                      <Stack space={1} style={{ flexGrow: 1, minWidth: 0 }}>
                        <Flex justify="space-between" align="center">
                          <Text size={1} weight="semibold" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {item.file.name}
                          </Text>
                          <Text size={0} muted>
                            {formatFileSize(item.file.size)}
                          </Text>
                        </Flex>

                        <Text size={0} muted style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          Title: <strong>{item.title}</strong>
                        </Text>
                        <Text size={0} muted style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          Alt: <em>{item.altText}</em>
                        </Text>

                        {/* Status Badges */}
                        <Inline space={2}>
                          {item.status === 'pending' && <Badge tone="default">Pending</Badge>}
                          {item.status === 'uploading' && <Badge tone="primary">Uploading...</Badge>}
                          {item.status === 'completed' && <Badge tone="positive">Uploaded ✓</Badge>}
                          {item.status === 'failed' && (
                            <Badge tone="critical">Failed: {item.error || 'Error'}</Badge>
                          )}
                        </Inline>
                      </Stack>

                      {!isUploading && item.status === 'pending' && (
                        <Button
                          icon={CloseIcon}
                          mode="bleed"
                          tone="critical"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeQueuedFile(item.id)
                          }}
                        />
                      )}
                    </Flex>
                  </Card>
                ))}
              </Grid>

              {!isUploading && (
                <Flex justify="flex-end">
                  <Button
                    icon={UploadIcon}
                    text={`Start Bulk Upload (${queuedFiles.length} Photos)`}
                    tone="primary"
                    size={3}
                    onClick={startUpload}
                    disabled={!selectedCategoryId}
                  />
                </Flex>
              )}
            </Stack>
          </Card>
        )}

        {/* Step 4: Completion Summary & Workflow Report */}
        {uploadFinished && (
          <Card padding={5} radius={3} shadow={2} tone="positive">
            <Stack space={4}>
              <Flex align="center" gap={3}>
                <Box style={{ fontSize: '2rem' }}>
                  <CheckmarkIcon />
                </Box>
                <Stack space={1}>
                  <Heading size={2}>Upload Complete</Heading>
                  <Text size={1}>
                    Your photos have been processed and published into Sanity Studio.
                  </Text>
                </Stack>
              </Flex>

              {/* Summary Stats */}
              <Grid columns={3} gap={3}>
                <Card padding={3} radius={2} tone="positive" border>
                  <Flex direction="column" gap={1} align="center">
                    <Text size={0} weight="bold">
                      Uploaded
                    </Text>
                    <Heading size={3}>{uploadedCount}</Heading>
                  </Flex>
                </Card>

                <Card padding={3} radius={2} tone={failedCount > 0 ? 'critical' : 'default'} border>
                  <Flex direction="column" gap={1} align="center">
                    <Text size={0} weight="bold">
                      Failed
                    </Text>
                    <Heading size={3}>{failedCount}</Heading>
                  </Flex>
                </Card>

                <Card padding={3} radius={2} tone="default" border>
                  <Flex direction="column" gap={1} align="center">
                    <Text size={0} weight="bold">
                      Skipped
                    </Text>
                    <Heading size={3}>0</Heading>
                  </Flex>
                </Card>
              </Grid>

              {/* Failed Files Details List */}
              {failedFiles.length > 0 && (
                <Card padding={3} radius={2} tone="critical" border>
                  <Stack space={2}>
                    <Text size={1} weight="bold">
                      ⚠️ Failed Filenames:
                    </Text>
                    {failedFiles.map((f, idx) => (
                      <Text key={idx} size={1}>
                        • <strong>{f.filename}</strong>: {f.error}
                      </Text>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Workflow Action Buttons */}
              <Flex gap={3} justify="flex-end">
                <Button
                  icon={RefreshIcon}
                  text="✓ Upload More"
                  tone="default"
                  mode="ghost"
                  size={3}
                  onClick={resetForm}
                />
                <Button
                  icon={ArrowRightIcon}
                  text="✓ View Uploaded Photos"
                  tone="primary"
                  size={3}
                  onClick={navigateToUploadedPhotos}
                />
              </Flex>
            </Stack>
          </Card>
        )}
      </Stack>
    </Box>
  )
}
