'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { ArrayOfObjectsInputProps, setIfMissing, insert, set, useClient } from 'sanity'
import {
  Card,
  Flex,
  Box,
  Stack,
  Text,
  Heading,
  Button,
  Select,
  TextInput,
  Spinner,
  Badge,
  Checkbox,
} from '@sanity/ui'
import {
  SearchIcon,
  AddIcon,
  CheckmarkIcon,
  ImageIcon,
  TrashIcon,
  CloseIcon,
  FilterIcon,
} from '@sanity/icons'

interface PhotographyImageItem {
  _id: string
  title?: string
  altText?: string
  categoryTitle?: string
  categoryId?: string
  imageUrl?: string
}

interface PhotographyCategory {
  _id: string
  title: string
}

export function GalleryImageSelector(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, readOnly } = props
  const client = useClient({ apiVersion: '2024-01-01' })

  const [images, setImages] = useState<PhotographyImageItem[]>([])
  const [categories, setCategories] = useState<PhotographyCategory[]>([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Fetch all photography images (with cropped thumbnail projections) and categories
  useEffect(() => {
    let isSubscribed = true
    async function fetchData() {
      setLoading(true)
      try {
        const [imgs, cats] = await Promise.all([
          client.fetch<PhotographyImageItem[]>(`
            *[_type == "photographyImage"] | order(_createdAt desc) {
              _id,
              title,
              altText,
              "categoryTitle": category->title,
              "categoryId": category->_id,
              "imageUrl": image.asset->url + "?w=200&h=200&fit=crop"
            }
          `),
          client.fetch<PhotographyCategory[]>(`
            *[_type == "photographyCategory"] | order(title asc) {
              _id,
              title
            }
          `),
        ])

        if (isSubscribed) {
          setImages(imgs || [])
          setCategories(cats || [])
        }
      } catch (err) {
        console.error('Error fetching gallery images for selector:', err)
      } finally {
        if (isSubscribed) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isSubscribed = false
    }
  }, [client])

  // Set of IDs currently present in the galleryImages array
  const existingRefIds = useMemo(() => {
    const set = new Set<string>()
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        if (item && item._ref) {
          set.add(item._ref)
        }
      })
    }
    return set
  }, [value])

  // Map of images by ID for fast lookup
  const imageMap = useMemo(() => {
    const map = new Map<string, PhotographyImageItem>()
    images.forEach((img) => map.set(img._id, img))
    return map
  }, [images])

  // Filtered images based on search and category
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && img.categoryId !== selectedCategoryFilter) {
        return false
      }

      // Search term filter
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase()
        const matchTitle = (img.title || '').toLowerCase().includes(term)
        const matchAlt = (img.altText || '').toLowerCase().includes(term)
        const matchCategory = (img.categoryTitle || '').toLowerCase().includes(term)
        if (!matchTitle && !matchAlt && !matchCategory) {
          return false
        }
      }

      return true
    })
  }, [images, selectedCategoryFilter, searchTerm])

  const toggleSelect = (id: string) => {
    if (existingRefIds.has(id) || readOnly) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSelectAllFiltered = () => {
    const next = new Set(selectedIds)
    filteredImages.forEach((img) => {
      if (!existingRefIds.has(img._id)) {
        next.add(img._id)
      }
    })
    setSelectedIds(next)
  }

  const handleClearSelection = () => {
    setSelectedIds(new Set())
  }

  const handleAddSelected = () => {
    if (selectedIds.size === 0 || readOnly) return

    const selectedArray = Array.from(selectedIds)
    const newItems = selectedArray.map((id) => ({
      _type: 'reference',
      _ref: id,
      _key: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    }))

    // Execute Sanity Studio v3 patch to append to end of array
    onChange([setIfMissing([]), insert(newItems, 'after', [-1])])

    const count = selectedArray.length
    setSelectedIds(new Set())
    setSuccessMessage(`✓ Successfully added ${count} image${count > 1 ? 's' : ''} to the gallery!`)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000)
  }

  // Remove a photo reference from the current galleryImages array
  const handleRemoveItem = (keyToRemove: string) => {
    if (readOnly) return
    const updatedValue = (value || []).filter((item: any) => item._key !== keyToRemove)
    onChange(set(updatedValue))
  }

  return (
    <Card padding={4} radius={3} shadow={1} tone="default">
      <Stack space={4}>
        {/* Header & Description */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Stack space={1}>
            <Heading size={1}>🖼️ Landing Page Gallery Manager</Heading>
            <Text size={1} muted>
              Search, filter, and multi-select photos from Uploaded Photos to add them to this Landing Page.
            </Text>
          </Stack>
          {successMessage && (
            <Badge tone="positive" size={2}>
              {successMessage}
            </Badge>
          )}
        </Flex>

        {/* Search & Filter Toolbar */}
        <Card padding={3} radius={2} tone="transparent" border>
          <Flex gap={3} direction={['column', 'row']} align="center">
            {/* Search Input */}
            <Box style={{ flex: 1, width: '100%' }}>
              <TextInput
                icon={SearchIcon}
                placeholder="Search title, filename, or alt text (e.g. 'muslim')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                clearButton={searchTerm.length > 0}
                onClear={() => setSearchTerm('')}
              />
            </Box>

            {/* Category Dropdown */}
            <Flex gap={2} align="center" style={{ width: '100%', maxWidth: '320px' }}>
              <Text size={1} weight="semibold" style={{ whiteSpace: 'nowrap' }}>
                Category:
              </Text>
              <Box style={{ flex: 1 }}>
                <Select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.currentTarget.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
          </Flex>
        </Card>

        {/* Action Bar & Stats */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Flex gap={2} align="center">
            <Text size={1} muted>
              Showing <strong>{filteredImages.length}</strong> of {images.length} photos
            </Text>
            {selectedIds.size > 0 && (
              <Badge tone="primary" size={1}>
                {selectedIds.size} selected
              </Badge>
            )}
          </Flex>

          <Flex gap={2}>
            {filteredImages.length > 0 && (
              <Button
                size={1}
                mode="ghost"
                text="Select All Filtered"
                onClick={handleSelectAllFiltered}
                disabled={readOnly}
              />
            )}
            {selectedIds.size > 0 && (
              <Button
                size={1}
                mode="ghost"
                tone="critical"
                text="Clear Selection"
                onClick={handleClearSelection}
              />
            )}
            <Button
              size={2}
              tone="primary"
              icon={AddIcon}
              text={`Add Selected (${selectedIds.size})`}
              disabled={selectedIds.size === 0 || readOnly}
              onClick={handleAddSelected}
            />
          </Flex>
        </Flex>

        {/* Image Grid Selector - Clean CSS Grid */}
        {loading ? (
          <Card padding={5} radius={2} tone="default">
            <Flex justify="center" align="center" gap={2}>
              <Spinner muted />
              <Text size={1}>Loading uploaded photos...</Text>
            </Flex>
          </Card>
        ) : filteredImages.length === 0 ? (
          <Card padding={5} radius={2} tone="caution" border>
            <Flex justify="center" align="center">
              <Text size={1}>
                No images found matching your search or category filter.
              </Text>
            </Flex>
          </Card>
        ) : (
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px',
              maxHeight: '420px',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {filteredImages.map((img) => {
              const isAlreadyAdded = existingRefIds.has(img._id)
              const isChecked = selectedIds.has(img._id)

              return (
                <Card
                  key={img._id}
                  padding={2}
                  radius={2}
                  border
                  tone={isAlreadyAdded ? 'transparent' : isChecked ? 'primary' : 'default'}
                  style={{
                    opacity: isAlreadyAdded ? 0.65 : 1,
                    cursor: isAlreadyAdded ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => toggleSelect(img._id)}
                >
                  <Stack space={2}>
                    {/* Fixed-Height Thumbnail Container */}
                    <Box
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100px',
                        backgroundColor: '#111',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      {img.imageUrl ? (
                        <img
                          src={img.imageUrl}
                          alt={img.title || 'Photo'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <Flex
                          align="center"
                          justify="center"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <ImageIcon />
                        </Flex>
                      )}

                      {/* Checkbox / Status Overlay */}
                      <Box style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 2 }}>
                        {isAlreadyAdded ? (
                          <Badge tone="default" size={0}>
                            Added ✓
                          </Badge>
                        ) : (
                          <Checkbox checked={isChecked} onChange={() => {}} />
                        )}
                      </Box>
                    </Box>

                    {/* Image Info */}
                    <Stack space={1}>
                      <Text
                        size={0}
                        weight="semibold"
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          fontSize: '11px',
                        }}
                      >
                        {img.title || 'Untitled Photo'}
                      </Text>
                      {img.categoryTitle && (
                        <Text size={0} muted style={{ fontSize: '10px' }}>
                          {img.categoryTitle}
                        </Text>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              )
            })}
          </Box>
        )}

        {/* Current Gallery Section (With Delete / Remove Ability) */}
        <Card padding={4} radius={2} tone="transparent" border style={{ marginTop: '8px' }}>
          <Stack space={3}>
            <Flex justify="space-between" align="center">
              <Heading size={1}>📋 Current Gallery ({value.length} Photos)</Heading>
              <Text size={0} muted>
                Click 🗑️ to remove any photo from this landing page.
              </Text>
            </Flex>

            {value.length === 0 ? (
              <Text size={1} muted style={{ fontStyle: 'italic' }}>
                No photos selected yet. Use the grid above to add photos to this landing page gallery.
              </Text>
            ) : (
              <Flex gap={3} style={{ overflowX: 'auto', paddingBottom: '8px' }}>
                {value.map((item: any, idx: number) => {
                  const refId = item?._ref
                  const img = refId ? imageMap.get(refId) : null
                  return (
                    <Card
                      key={item._key || idx}
                      padding={1}
                      radius={2}
                      border
                      style={{
                        width: '84px',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <Stack space={1}>
                        <Box
                          style={{
                            width: '100%',
                            height: '60px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#000',
                            position: 'relative',
                          }}
                        >
                          {img?.imageUrl ? (
                            <img
                              src={img.imageUrl}
                              alt={img.title || 'Gallery item'}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Flex align="center" justify="center" style={{ height: '100%' }}>
                              <ImageIcon />
                            </Flex>
                          )}

                          {/* Delete / Remove Button */}
                          {!readOnly && item._key && (
                            <Box style={{ position: 'absolute', top: '2px', right: '2px' }}>
                              <Button
                                icon={CloseIcon}
                                tone="critical"
                                size={0}
                                style={{ padding: '2px', minHeight: 'auto' }}
                                title="Remove photo from gallery"
                                onClick={() => handleRemoveItem(item._key)}
                              />
                            </Box>
                          )}
                        </Box>

                        <Text
                          size={0}
                          style={{
                            fontSize: '10px',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                          }}
                        >
                          {img?.title || refId?.substring(0, 8) || 'Photo'}
                        </Text>
                      </Stack>
                    </Card>
                  )
                })}
              </Flex>
            )}
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}
