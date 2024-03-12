'use client'

import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const nav_items = [
    {
        key: 1,
        label: 'Home'
    },
    {
        key: 2,
        label: 'Content'
    },
    {
        key: 3,
        label: 'Contact'
    }
]

const Navbar: React.FC = () => {
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken()

    return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                items={nav_items}
                style={{ flex: 1, minWidth: 0 }}
            />
    </Header>)
}

export default Navbar