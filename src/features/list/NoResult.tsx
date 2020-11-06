import React from 'react'

import styles from './NoResult.module.css'

function NoResult() {
    return (
        <div className={styles.container}>
            <h3>No GIFs found</h3>
        </div>
    )
}

export default NoResult