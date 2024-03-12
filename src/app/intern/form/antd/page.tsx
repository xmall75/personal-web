'use client'

import { Button, Checkbox, Form, type FormProps, Input, Layout } from 'antd';
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FieldType = {
    email: string;
    password: string;
}

const { Content } = Layout

export default function InternFormAntdPage() {

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log('Success:', values);
    };

    return (
        <Layout>
            <Content className="p-16 flex items-center justify-center">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        className="w-[250px] lg:w-[400px]"
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email.' }]}
                    >
                        <Input className="w-full" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        className="w-[250px] lg:w-[400px]"
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password.' }]}
                    >
                        <Input.Password className="w-full" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    )
}