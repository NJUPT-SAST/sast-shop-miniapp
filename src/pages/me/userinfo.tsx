import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './userinfo.scss'

export default function UserInfo() {

    useLoad(() => {
        console.log('Page loaded.')
    })
    const head_portrait: string = "./"
    const nickname: string = "用户"
    return (
        <View className='bigFrame'>
            <View className='userinfo'>
                <Image src={head_portrait} className='headportrait' />
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