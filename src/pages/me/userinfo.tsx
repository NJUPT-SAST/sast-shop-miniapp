import { View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './userinfo.scss'

interface info {
    name: string;
}

export default function UserInfo() {



    //const token = Taro.getStorageSync("TOKEN")
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVEdUpfci00UzJFS2I3LXpEM2Y4WV9VIiwic2Vzc2lvbl9rZXkiOiJlc3o3RHNwMC95Qy9yRThZYjZ4VTlRPT0iLCJleHAiOjMxMTIwODQwNjk2ODR9.VE1yXq6o8huEnAOPuj-HzW_ZUG5dmd1Aaw_cRv-2dVk'
    const [nickname, setNickname] = useState('用户')
    const [headPortrait, setHeadPortrait] = useState('')


    useLoad(() => {
        console.log('Page loaded.')
        Taro.request({
            method: 'GET',
            url: 'https://wechatpayment.sast.fun/user',
            header: {
                'TOKEN': { token }
            },
            success(res) {
                setNickname(res.data.name)
            }
        })
    })

    return (
        <View className='bigFrame'>
            <View className='userinfo'>
                <Image src={headPortrait} className='headportrait' />
                <View className='item'>
                    <View className='label'>昵称</View>
                    <View className='valueBody'>
                        <View className='value'>{nickname}</View>
                    </View>
                </View>
            </View>
        </View>

    )
}