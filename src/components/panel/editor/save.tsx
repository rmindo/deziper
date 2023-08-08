'use client'

import React from 'react'
import {useRouter} from 'next/navigation'
import {http, hooks, getStatus} from '@src/helpers/common'
import {
  HTTPResponse,
  PageInterface,
  PostInterface
}
from '@src/interface/common'

/**
 * Components
 */
import Button from '@src/components/panel/fields/button'
import PopupMessage from '@src/components/popup/message'


type SaveProps = {
  method: string,
  saved?: Function,
  plain?: boolean,
  resource: string,
  data?: PageInterface | PostInterface
}

/**
 * Save post or page base on resource type provided
 * @param params
 * @returns {ReactElement}
 */
export default function Save({data, method, saved, plain, resource}: SaveProps) {
  const state = hooks.useState({
    notify: null,
    saving: false,
    publishing: false
  })
  const router = useRouter()

  
  const save = (status: string, saving: object) =>  {
    state.set(saving)

    const path = resource.toLowerCase()
    http[method](path, {
      data: {
        ...data,
        status
      }
    })
    .then(({code, data, message}: HTTPResponse & {data: PageInterface | PostInterface}) => {
      if(data) {
        if(code == 200) {
          if(saved) {
            saved(data)
            state.set({saving: false, publishing: false})
          }
        }
        if(code == 201) {
          router.replace(`/panel/${path}/edit/${data.id}`)
        }
      }
      state.set({
        notify: message,
        status: code
      })
    })
    .finally(() => {
      setTimeout(() => {
        state.set({notify: null, saving: false, publishing: false})
      }, 3000)
    })
    .catch((e: any) => console.log(e))
  }
  
  if(plain) {
    return (
      <>
        <span
          className={`save ${data?.status == 'Draft' ? 'blur' : ''}`}
          onClick={() => {
            if(data?.status == 'Published') {
              save('Draft', {saving: true})
            }
          }}>
          {state.saving ? 'Moving...' : 'Move to Draft'}
        </span>
        <PopupMessage notify={state.notify} status={state.status}/>
      </>
    )
  }
  else {
    return (
      <div
        className="save action">
        <Button
          type={2}
          icon={'plane-slope'}
          label={'Publish'}
          loading={state.publishing}
          onClick={() => {
            save('Published', {publishing: true})
          }}
          style={{
            opacity: data?.status == 'Published' ? 0.4 : 1
          }}
          disabled={data?.status == 'Published'}
        />
        <Button
          type={1}
          icon={'save'}
          loading={state.saving}
          onClick={() => {
            save(data?.id ? data.status : 'Draft', {saving: true})
          }}
          label={data?.id ? 'Update' : 'Save as Draft'}
        />
        <PopupMessage notify={state.notify} status={state.status}/>
      </div>
    )
  }
}
