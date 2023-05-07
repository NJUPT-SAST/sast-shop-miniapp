import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import UserInfo from './userinfo'
import History from './history'

export default function Me() {

  useLoad(() => {
    console.log('Page loaded.')
  })

let props={

}

  return (
    <View className='me'>
      <UserInfo />
      <History props={props} />
    </View>
  )
}
