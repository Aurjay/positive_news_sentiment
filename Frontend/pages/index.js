import Head from 'next/head'
import Heading from '@/src/components/Heading';
import NewsArea from '@/src/components/NewsArea';
import ImportNews from '@/src/components/ImportNews';
import "@appwrite.io/pink";

export default function Home() {
  return (
    <>
      <Head>
        <title>Only Positive News</title>
      </Head>
      <div class="box u-margin-32 u-padding-block-12">
        <h1 class="heading-level-1 u-text-center">Only Positive News</h1>
        <Heading />
        <ImportNews />
      </div>
    </>
  )
}
