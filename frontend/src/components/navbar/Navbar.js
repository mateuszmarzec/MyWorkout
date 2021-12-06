import React from 'react'
import Item from './Item'
import Link from 'next/link'
import LoggedOutPermission from '../permissions/LoggedOutPermission';
import LoggedInPermission from '../permissions/LoggedInPermission';
import { useTranslation } from 'next-i18next';
import authService from '../../services/auth.service';
import { useSWRConfig } from 'swr';

function Navbar() {
    const { t } = useTranslation('navigationBar');
    const { mutate } = useSWRConfig()

    return (
        <div className="fixed w-full shadow-navbar bg-white font-normal text-lg">
            <nav className="2xl:max-w-XlMax 2xl:mx-auto mx-6 xl:mx-20 flex space-x-4">
                <LoggedOutPermission>
                    <Item><Link href="/login">{t('login')}</Link></Item>
                </LoggedOutPermission>
                <Item>
                    <Link href="/about">{t('about')}</Link>
                </Item>
                <LoggedInPermission>
                    <Item><Link href="/workouts">{t('workouts')}</Link></Item>
                    <Item><Link href="/progressions">{t('progressions')}</Link></Item>
                    <Item onClick={async() => {await authService.logout(); mutate('/user/')}}><Link href="/login">{t('logout')}</Link></Item>
                </LoggedInPermission>
            </nav>
        </div>
    )
}

export default Navbar
