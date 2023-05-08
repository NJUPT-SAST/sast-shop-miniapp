import { useState } from 'react';
import { View, Text, Input, Picker, Radio, RadioGroup, Button } from '@tarojs/components';
import './order-detail.scss'

export default function Orderdetail() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [color, setColor] = useState('卡其色');
    const [post, setPost] = useState(false);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.detail.value === '卡其色' ? '卡其色' : '蓝色');
    };

    const handlePostChange = (event) => {
        setPost(event.detail.value === '是');
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleQuantityChange = (delta) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    const handleSubmit = () => {
        //提交表单数据
    };

    const handleCancellation = () => {
        //取消订单
    }

    return (
        <View>
            <View className='formItem'>
                <Text className='label'>收货人：</Text>
                <Input className='inputBox' value={name} onInput={handleNameChange} />
            </View>
            <View className='formItem'>
                <Text className='label'>手机号码：</Text>
                <Input className='inputBox' value={phone} type='number' onInput={handlePhoneChange} />
            </View>
            <View className='formItem'>
                <Text className='label'>用户邮箱：</Text>
                <Input className='inputBox' value={email} type='text' onInput={handleEmailChange} />
            </View>
            <View className='formItem'>
                <Text className='label'>类型：</Text>
                <Picker className='selector' mode='selector' range={['卡其色', '蓝色']} value={color === '卡其色' ? 0 : 1} onChange={handleColorChange}>
                    <Text>{color}</Text>
                </Picker>
            </View>
            <View className='formItem'>
                <Text className='label'>邮寄：</Text>
                <RadioGroup className='singleChoice' onChange={handlePostChange}>
                    <Radio value='是' checked={post}>
                        是
                    </Radio>
                    <Radio value='否' checked={!post}>
                        否
                    </Radio>
                </RadioGroup>
            </View>
            <View className='formItem'>
                <Text className='label'>邮寄地址：</Text>
                <Input className='inputBox' value={address} onInput={handleAddressChange} />
            </View>
            <View className='formItem'>
                <Text className='label'>购买数量：</Text>
                <View>
                    <Button className='quantityButton' onClick={() => handleQuantityChange(-1)}>
                        -
                    </Button>
                    <Text>{quantity}</Text>
                    <Button className='quantityButton' onClick={() => handleQuantityChange(1)}>
                        +
                    </Button>
                </View>
            </View>
            <View className='buttons'>
                <View className='formItem'>
                    <Button plain type='primary' size='mini' onClick={handleCancellation} className='cancelOrder'>取消订单</Button>
                </View>
                <View className='formItem'>
                    <Button plain type='primary' size='mini' onClick={handleSubmit} className='submitChange'>提交修改</Button>
                </View>
            </View>
        </View>
    );
};