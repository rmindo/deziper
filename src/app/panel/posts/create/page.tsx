'use client'

import {useState} from '@src/helpers/hooks'

import Editor from '@src/components/editor'
import Select from '@src/components/fields/select'


export default function Create() {
  const state = useState({content: null})

  return (
    <>
      <header>
        <div className="top">
          <h3>Create Post</h3>
          <div className="action">
            <button
              className="button-2">
              <i className="icon-plane-slope"></i>
              <span>Publish</span>
            </button>
            <button
              onClick={() => {
                console.log(state.content)
              }}
              className="button-1">
              <i className="icon-save"></i>
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>
      <div className="create">
        <div className="left">
          <div className="editor">
            <Editor
              content={(data: any) => {
                state.set({content: data})
              }}
            />
          </div>
        </div>
        <div className="right">
          <div className="field">
            <label>Category</label>
            <Select
              radio
              width={{
                select: '100%',
                option: '90%'
              }}
              icon={'grid'}
              label={'Select Category'}
              option={['Code', 'Security', 'Network', 'Technology']}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea>Lexical makes it possible to easily create complex text editing experiences that otherwise would be very complex with the built-in browser tooling.</textarea>
          </div>
        </div>
      </div>
    </>
  )
}
