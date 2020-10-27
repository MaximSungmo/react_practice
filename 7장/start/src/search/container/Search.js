import { Col, Row, Typography } from 'antd';
import React from 'react';
import SearchInput from '../component/SearchInput';
import Settings from '../component/Settings';

export default function Search() {
    return (
    <>
        <Row justify="end" style={{ padding: 20 }}>
            <Col>
                <Settings logout={()=>{}} />
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 100 }}>
            <Col>
                <Typography.Title style={{ fontFamily: 'Caligraphy' }}>찾아야한다</Typography.Title>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 50 }}>
            <Col span={12}><SearchInput/></Col>
        </Row>
    </>
    );
}
