import React from 'react'
import BaseSection from '../sections/BaseSection';
import { useTranslation } from 'next-i18next';
import LoginForm from '../forms/LoginForm';

const Header = () => {
    const { t } = useTranslation('header')

    return (
        <BaseSection>
            <div className="flex flex-col md:flex-row justify-between"> 
                <div className="my-auto md:w-1/2 md:mr-4">
                        <h1 className="text-[46px] text-primary leading-[50px] font-bold tracking-tight lg:text-[60px] lg:leading-[64px]">{t('title')}</h1>
                        <h3 className="pt-[16px] text-[18px] lg:text-[24px]">{t('subtitle')}</h3>
                </div>
                <div className="my-auto md:w-1/2 md:ml-4">
                    <LoginForm/>
                </div>
            </div>
        </BaseSection>
    )
}

export default Header