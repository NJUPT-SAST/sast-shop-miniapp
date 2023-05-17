import { useState } from 'react';
import Taro, { getStorageSync } from '@tarojs/taro';
import { View, Text, Input, Picker, Radio, RadioGroup, Button, Image } from '@tarojs/components';
import box from '../../assets/images/Box.svg'
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

    //const token = getStorageSync("TOKEN");
    const token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVEdUpfci00UzJFS2I3LXpEM2Y4WV9VIiwic2Vzc2lvbl9rZXkiOiJlc3o3RHNwMC95Qy9yRThZYjZ4VTlRPT0iLCJleHAiOjMxMTIwODQwNjk2ODR9.VE1yXq6o8huEnAOPuj-HzW_ZUG5dmd1Aaw_cRv-2dVk'
    const id = Taro.getCurrentInstance()?.router?.params?.id || '';

    const handleSubmit = () => {
        Taro.showModal({
            title: '确认修改',
            content: '确认提交修改？',
            success: function (res) {
                if (res.confirm) {
                    Taro.request({
                        url: 'https://wechatpayment.sast.fun/user/order/' + id,
                        method: 'PATCH',
                        header: {
                            'TOKEN': { token }
                        },
                        data: {
                            name: name,
                            phone: phone,
                            email: email,
                            address: address,
                        },
                        success: function () {
                            Taro.showToast({
                                title: '修改成功',
                                icon: 'success',
                                duration: 2000
                            }).then(
                                () => {
                                    setTimeout(
                                        () => {
                                            Taro.switchTab({
                                                url: '/pages/me/index'
                                            })
                                        }, 2000)
                                }
                            )
                        },
                        fail: function () {
                            Taro.showToast({
                                title: '修改失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    };

    const handleCancellation = () => {
        Taro.showModal({
            title: '确认取消',
            content: '确认取消订单？',
            success: function (res) {
                if (res.confirm) {
                    Taro.request({
                        url: 'https://wechatpayment.sast.fun/user/order/' + id,
                        method: 'DELETE',
                        header: {
                            'TOKEN': { token }
                        },
                        success: function () {
                            Taro.showToast({
                                title: '订单已取消',
                                icon: 'success',
                                duration: 2000
                            }).then(
                                () => {
                                    setTimeout(
                                        () => {
                                            Taro.switchTab({
                                                url: '/pages/me/index'
                                            })
                                        }, 2000)
                                }
                            )
                        },
                        fail: function () {
                            Taro.showToast({
                                title: '取消订单失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    }

    return (
        <>
            <View className='title'>
                <Image src={box} style={{ height: '50rpx', width: '50rpx' }} />
                <Text className='titleText'>编辑收货详情</Text>
            </View>
            <View className='frame'>
                <View className='formItem'>
                    <Text className='label'>收货人：</Text>
                    <Input className='inputBox' value={name} onInput={handleNameChange} placeholder='一名用户' />
                </View>
                <View className='formItem'>
                    <Text className='label'>手机号码：</Text>
                    <Input className='inputBox' value={phone} type='number' onInput={handlePhoneChange} placeholder='用户号码' />
                </View>
                <View className='formItem'>
                    <Text className='label'>用户邮箱：</Text>
                    <Input className='inputBox' value={email} type='text' onInput={handleEmailChange} placeholder='用户邮箱' />
                </View>
                <View className='formItem'>
                    <Text className='label'>类型：</Text>
                    <Picker className='selector' mode='selector' range={['卡其色', '蓝色']} value={color === '卡其色' ? 0 : 1} onChange={handleColorChange}>
                        <Text style={{ fontSize: '32rpx' }}>{color}</Text>
                    </Picker>
                </View>
                <View className='formItem'>
                    <Text className='label'>邮寄：</Text>
                    <RadioGroup className='singleChoice' onChange={handlePostChange}>
                        <Radio color='#EB4F1E' value='是' checked={post}>
                            是
                        </Radio>
                        <Radio color='#EB4F1E' style={{ marginLeft: '20px' }} value='否' checked={!post}>
                            否
                        </Radio>
                    </RadioGroup>
                </View>
                <View className='formItem'>
                    <Text className='label'>邮寄地址：</Text>
                    <Input className='inputBox' value={address} onInput={handleAddressChange} placeholder='地址' />
                </View>
                <View className='formItem'>
                    <Text className='label'>购买数量：</Text>
                    <View className='quantityContainer'>
                        <Button hoverClass='button-active' hoverStartTime={0} className='quantityButtonLeft' onClick={() => handleQuantityChange(-1)}>-</Button>
                        <Text className='quantityNumber'>{quantity}</Text>
                        <Button hoverClass='button-active' hoverStartTime={0} className='quantityButtonRight' onClick={() => handleQuantityChange(1)}>+</Button>
                    </View>
                </View>
            </View>
            <View className='buttons'>
                <Button hoverClass='button-active' hoverStartTime={0} onClick={handleCancellation} className='cancelOrder'>取消订单</Button>
                <Button hoverClass='button-active' hoverStartTime={0} onClick={handleSubmit} className='submitChange'>提交修改</Button>
            </View>
        </>
    );
};