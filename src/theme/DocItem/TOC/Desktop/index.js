import React, {useEffect, useState} from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import TOC from '@theme/TOC';
import clsx from "clsx";
import styles from './styles.module.css'
import IconClose from '@theme/Icon/Close';

export default function DocItemTOCDesktop() {
  const {toc, frontMatter} = useDoc();
  const [isClosed, setClosed] = useState(true)
  
  useEffect(() => {
    const closed =
      window.localStorage.getItem('doc-cloud-card-banner') === 'closed'
    if (!isClosed || closed !== isClosed) {
      setClosed(closed)
    }
  }, [])
  
  return (
    <div className={clsx(styles.docTOCContainer, 'theme-doc-toc-desktop-container')}>
      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={clsx(styles.docTOC, ThemeClassNames.docs.docTocDesktop)}
      />
      {!isClosed && (<div className={styles.docCloudCard}>
        <div className={styles.docCloudCardHeader}>
          <h6>免费试用 ClickHouse 云</h6>
          <button
            className={styles.docCloudClose}
            onClick={() => {
              setClosed(true)
              window.localStorage.setItem('doc-cloud-card-banner', 'closed')
            }}>
            <IconClose color="var(--ifm-color-emphasis-600)" width={10} height={10}/>
          </button>
        </div>
        <p className={styles.docCloudCardContent}>轻松的数据摄取、自动扩展、内置 SQL 控制台等等。</p>
        <a href='https://clickhouse.cloud/signUp?loc=doc-card-banner'
           className={clsx(styles.docCloudCardLink, 'click-button primary-btn')}>免费试用</a>
      </div>)}
    </div>
  );
}
