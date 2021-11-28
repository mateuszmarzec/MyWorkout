import React from 'react'
import LoginForm from './LoginForm';
import BaseSection from '../../components/sections/BaseSection';
import { useTranslation } from 'next-i18next';

const Header = () => {
    const { t } = useTranslation('header')

    return (
        <BaseSection>
            <div className="flex flex-row justify-between"> 
                <div className="my-auto">
                        <h1 className="text-[60px] leading-[64px] font-bold tracking-tight">{t('title')}</h1>
                        <h3 className="text-[30px]">{t('subtitle')}</h3>
                </div>
                <div className="my-auto">
                    <LoginForm/>
                </div>
            </div>
        </BaseSection>
    )
}

export default Header