import { View, Image, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import './history.scss'

interface Props {
    order: {
        id: string;
        name: string;
        type: string;
        price: string;
        count: string;
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

    // function turnToProductDetail() {
    //     Taro.navigateTo({
    //         url: '/pages/product-detail/index'
    //     })
    // }

    function turnToOrderDetail() {
        Taro.navigateTo({
            url: '/pages/order-detail/index?id=' + props.order.id
        })
    }

    return (
        <>
            <View className='outterFrame'>
                <View className='innerFrame'>
                    <View className='status'>
                        {orderStatus ? '未发货' : '已发货'}
                    </View>
                    <View className='particular'>
                        <Image className='commodity' src={props.order.image} />
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
                                <View className='realPay'>实付款¥{(((props.order.price as unknown) as number) * ((props.order.count as unknown) as number)).toFixed(2)}</View>
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

