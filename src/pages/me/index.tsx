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
  isDelete: string;
  recordId: number | null;
}

export default function Me() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [token, setToken] = useState<string>('')
  //setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVEdUpfci00UzJFS2I3LXpEM2Y4WV9VIiwic2Vzc2lvbl9rZXkiOiJDTW9kblhCb3VuMURxMDZRWENUZVVBPT0iLCJleHAiOjMxMTIwODQ0MTgyMjl9.wDVbxf5pRKpxoAzK2MPzSdih4QnA81slBTF3c0TsSio')

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
        'TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVEdUpfci00UzJFS2I3LXpEM2Y4WV9VIiwic2Vzc2lvbl9rZXkiOiJDTW9kblhCb3VuMURxMDZRWENUZVVBPT0iLCJleHAiOjMxMTIwODQ0MTgyMjl9.wDVbxf5pRKpxoAzK2MPzSdih4QnA81slBTF3c0TsSio'
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

  console.log(orderData)

  return (
    <View className='me'>
      <UserInfo />
      <View className='orders'>
        {orderData.length > 0 ?
          orderData.map((order: Order, index: number) => (
            order.isDelete === "0" ? <History key={index} order={order} /> : null
          )) :
          <Text className='no-order'>暂无历史订单</Text>}
      </View>
    </View>
  );
}