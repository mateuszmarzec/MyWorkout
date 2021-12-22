import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Chart from '../../components/charts/LineChart';

function Progressions() {
    return (
        <div className="flex h-[75vh]">
            <Chart />
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Progressions
