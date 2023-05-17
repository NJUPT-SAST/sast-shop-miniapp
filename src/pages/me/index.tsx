import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'
import UserInfo from './userinfo'
import History from './history'


interface Order {
  id: string;
  userId: number | null;
  name: string;
  phone: string;
  email: string;
  productId: number | null;
  type: string;
  size: string;
  count: string;
  price: string;
  image: string;
  isPay: boolean | null;
  needPost: boolean | null;
  postAddress: string | null;
  isPost: boolean | null;
  expressNum: string | null;
  isDelete: boolean | null;
  recordId: number | null;
}

export default function Me() {
  const [orderData, setOrderData] = useState<Order[]>([]);

  useLoad(() => {
    Taro.login({
      success(result) {
        if (result.code) {
          console.log(result.code)
          Taro.request({
            method: 'POST',
            url: 'https://wechatpayment.sast.fun/login',
            data: {
              weChatCode: result.code
            },
            success(token_res) {
              console.log(token_res)
            },
          })
        }
      },
    })
  })

  useEffect(() => {
    Taro.request({
      url: 'https://wechatpayment.sast.fun/user/order',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVEdUpfci00UzJFS2I3LXpEM2Y4WV9VIiwic2Vzc2lvbl9rZXkiOiJlc3o3RHNwMC95Qy9yRThZYjZ4VTlRPT0iLCJleHAiOjMxMTIwODQwNjk2ODR9.VE1yXq6o8huEnAOPuj-HzW_ZUG5dmd1Aaw_cRv-2dVk'
      },
      success: (res) => {
        if (res.data.success && res.data) {
          setOrderData(res.data.data);
        } else {
          console.error('获取订单数据失败：', res.data);
        }
      },
      fail: (err) => {
        console.error('获取订单数据失败：', err);
      }
    });
  }, []);

  console.log(orderData.length)

  return (
    <View className='me'>
      <UserInfo />
      <View className='orders'>
        {orderData.length > 0 ?
          orderData.map((order: Order, index: number) => (
            //order.isDelete?<></>:
            <History key={index} order={order} />
          )) :
          <Text className='no-order'>暂无历史订单</Text>}
      </View>
    </View>
  );
}