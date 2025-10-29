import EducationsData from '@/components/admin/educations/EducationsData'
import { EducationsFormDialog } from '@/components/admin/educations/form/EducationsFormDialog'
import React from 'react'

export default function Educations() {
  return (
    <section>
      <div className='flex items-center p-6 justify-between'>
        <h1 className='text-primary font-bold text-3xl'>Education</h1>
        <EducationsFormDialog/>
      </div>
      <EducationsData/>
    </section>
  )
}
