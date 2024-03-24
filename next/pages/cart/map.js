import React, { useEffect , useState} from 'react'

export default function Map() {
  const [formHtml, setFormHtml] = useState('')

  useEffect(() => {
    const htmlForm = localStorage.getItem('ecpayMapForm')
    if (htmlForm) {
      setFormHtml(htmlForm)
    }
  }, [])
  console.log(formHtml);
  return (
    <div dangerouslySetInnerHTML={{ __html: formHtml }} />
  )
}
