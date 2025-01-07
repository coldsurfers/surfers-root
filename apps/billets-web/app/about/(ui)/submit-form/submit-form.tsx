'use client'

import { Button, Checkbox, Text, TextArea, TextInput } from '@coldsurfers/ocean-road'
import { memo } from 'react'

export const SubmitForm = memo(() => {
  return (
    <div style={{ marginTop: '8rem' }}>
      <Text as="h1">Let me know your opinion 🗯️</Text>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0.4 }}>
          <Text as="h3">
            We want to hear all your voices about Billets. Anything is okay, even if you are user, venue owner,
            promoters, artists.
          </Text>
        </div>
        <form style={{ flex: 0.6, display: 'flex', flexDirection: 'column', marginLeft: '2.5rem' }}>
          <label style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Text as="p" style={{ margin: 'unset' }}>
              How can I call you?
            </Text>
          </label>
          <TextInput placeholder="name" style={{ width: '100%' }}></TextInput>
          <label style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Text as="p" style={{ margin: 'unset' }}>
              Your email, so I can contact you back
            </Text>
          </label>
          <TextInput placeholder="email" style={{ width: '100%' }}></TextInput>
          <label style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <Text as="p" style={{ margin: 'unset' }}>
              Give us some more details
            </Text>
          </label>
          <TextArea
            placeholder="Please describe your message to me. e.g. 'I am owner of a venue. And I want to work with your app'"
            style={{ resize: 'none', height: '12rem' }}
          />
          <Checkbox labelText="I want to receive updates from Billets" style={{ marginTop: '1rem' }} />
          <Button type="submit" style={{ marginTop: '2rem' }}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
})
