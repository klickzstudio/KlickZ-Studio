'use client'

/**
 * Sanity Studio Configuration mounted on `/studio` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('KLICKZSTUDIO Content')
          .items([
            // ── 1. WEBSITE PAGES ──────────────────────────────────────────
            S.listItem()
              .title('🌐 Website Pages')
              .child(
                S.list()
                  .title('Website Pages')
                  .items([
                    S.listItem()
                      .title('🏠 Home Page')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                      ),
                    S.listItem()
                      .title('📄 Core Pages (About, Pricing, Services, etc.)')
                      .child(
                        S.documentTypeList('sitePage')
                          .title('Core Pages')
                      ),
                  ])
              ),

            // ── 2. LANDING PAGES (SERVICES & SEO) ─────────────────────────
            S.listItem()
              .title('🎯 Service & SEO Landing Pages')
              .child(
                S.documentTypeList('landingPage')
                  .title('Landing Pages')
              ),

            S.divider(),

            // ── 3. PORTFOLIO & PHOTO COLLECTIONS ──────────────────────────
            S.listItem()
              .title('🖼️ Portfolio & Photo Collections')
              .child(
                S.list()
                  .title('Portfolio Content')
                  .items([
                    S.listItem()
                      .title('📁 Category Galleries')
                      .child(
                        S.documentTypeList('photographyCategory')
                          .title('Photography Categories')
                      ),
                    S.listItem()
                      .title('📸 Uploaded Photos')
                      .child(
                        S.documentTypeList('photographyImage')
                          .title('Individual Photos')
                      ),
                    S.listItem()
                      .title('💼 Featured Case Studies')
                      .child(
                        S.documentTypeList('portfolioItem')
                          .title('Case Studies')
                      ),
                  ])
              ),

            // ── 4. SOCIAL PROOF & MEDIA ──────────────────────────────────
            S.listItem()
              .title('💬 Social Proof & Media')
              .child(
                S.list()
                  .title('Social & Media')
                  .items([
                    S.listItem()
                      .title('💬 Client Testimonials')
                      .child(
                        S.documentTypeList('testimonial')
                          .title('Testimonials')
                      ),
                    S.listItem()
                      .title('📸 Instagram Feed')
                      .child(
                        S.documentTypeList('instagramPost')
                          .title('Instagram Posts')
                      ),
                    S.listItem()
                      .title('🎞️ Homepage Hero Slides')
                      .child(
                        S.documentTypeList('heroSlide')
                          .title('Hero Slides')
                      ),
                  ])
              ),

            S.divider(),

            // ── 5. SETTINGS ──────────────────────────────────────────────
            S.listItem()
              .title('⚙️ Global Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
