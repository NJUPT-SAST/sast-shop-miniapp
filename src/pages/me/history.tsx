import { View, Image, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './history.scss'

export default function History(props) {

    useLoad(() => {
        console.log('Page loaded.')
    })
    return (
        <View className='outterFrame'>
            <View className='innerFrame'>
                <View className='status'>
                    未发货{props.orderStatus}
                </View>
                <View className='particular'>
                    <Image src={props.img} className='commodity' />
                    <View className='textInfo'>
                        <View className='upperText'>
                            <View className='upperLeft'>
                                <View className='commidityName'>南京邮电大学校科协{props.Name}</View>
                                <View className='commidityType'>卡其色{props.type}</View>
                            </View>
                            <View className='upperRight'>
                                <View className='price'>¥99.00{props.price}</View>
                                <View className='number'>×1{props.number}</View>
                            </View>
                        </View>
                        <View className='lowerText'>
                            <View className='realPay'>实付款¥{(props.price * props.number).toFixed(2)}</View>
                        </View>
                    </View>
                </View>
                <View className='buttonFrame'>
                    <Button className='changeButton' plain type='primary' size='mini' onClick={turnToProductDetail}>修改订单</Button>
                </View>
            </View>
        </View>
    )
}

function turnToProductDetail() {
    Taro.navigateTo({
        url: '/pages/product-detail/index.tsx'
    })
}