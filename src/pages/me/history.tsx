import { View, Image, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import './history.scss'

interface Props {
    order: {
        id: number;
        name: string;
        type: string;
        price: number;
        count: number;
        isPay: boolean | null;
        isPost: boolean | null;
        image: string;
    };
}

export default function History(props: Props) {

    useLoad(() => {
        console.log('Page loaded.')
    })

    const [orderStatus, setOrderStatus] = useState<Boolean | null>(false);

    useEffect(() => {
        setOrderStatus(props.order.isPost);
    }, [props.order.isPost]);
    return (
        <>
            <View className='outterFrame'>
                <View className='innerFrame'>
                    <View className='status'>
                        {orderStatus ? '未发货' : '已发货'}
                    </View>
                    <View className='particular'>
                        <Image src={props.order.image} />
                        <View className='textInfo'>
                            <View className='upperText'>
                                <View className='upperLeft'>
                                    <View className='commodityName'>{props.order.name}</View>
                                    <View className='commdityType'>{props.order.type}</View>
                                </View>
                                <View className='upperRight'>
                                    <View className='price'>¥{props.order.price}</View>
                                    <View className='number'>×{props.order.count}</View>
                                </View>
                            </View>
                            <View className='lowerText'>
                                <View className='realPay'>实付款¥{(props.order.price * props.order.count)}</View>
                            </View>
                        </View>
                    </View>
                    <View className='buttonFrame'>
                        <Button className='changeButton' plain type='primary' size='mini' onClick={turnToOrderDetail}>修改订单</Button>
                    </View>
                </View>
            </View>
        </>
    )
}

function turnToProductDetail() {
    Taro.navigateTo({
        url: '/pages/product-detail/index'
    })
}

function turnToOrderDetail() {
    Taro.navigateTo({
        url: '/pages/order-detail/index'
    })
}