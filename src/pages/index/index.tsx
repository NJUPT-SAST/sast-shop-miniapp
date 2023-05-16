import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import item_image from '../../assets/images/index/frame.png'
import './index.scss'

export default function Index() {
  const [title, changeTitle] = useState([])
  const [price, changePrice] = useState([])
  const [id, changeId] = useState([])
  const [image, changeImage] = useState([])
  const [myId, changemyId] = useState([])
  const [indexObject, changeindexObject] = useState([{
    title: '南京邮电大学校科协 SAST 2023 纪念定制短袖',
    price: 99,
    image: item_image,
    id: 0
  },
  {
    title: '南京邮电大学校科协 SAST 2023 纪念定制短袖',
    price: 99,
    image: item_image,
    id: 1
  },
  {
    title: '南京邮电大学校科协 SAST 2023 纪念定制短袖',
    price: 99,
    image: item_image,
    id: 2
  }])

  const gotoDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/product-detail/index?id=${item.id}`
    })
  }


  useEffect(() => {
    Taro.request({
      url: 'http://127.0.0.1:4523/m1/2655521-0-default/user/product',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (let i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i])
          changeId(res.data.data[i].id)
          changeindexObject(res.data.data)
        }
        // console.log(res.data.data)
      }
    })
  }, [])

  useLoad(() => {
    // console.log('Page loaded.')
  })

  return (
    <ul className='index'>

      {
        indexObject.map((item) => {

          return (
            <li key={item.id} onClick={() => gotoDetail(item)}>
              <View className='body-item'>
                <View className='item-image'>
                  <Image mode='aspectFit' className='picture' style='height: 100px' src={item.image}></Image>
                </View>
                <View className='item-text'>
                  <View className='text-title'>
                    <Text>{item.title}</Text>
                  </View>
                  <View className='text-money'>
                    ￥{item.price}
                  </View>
                </View>
              </View>
            </li>
          )
        })
      }

    </ul>
  )
}
