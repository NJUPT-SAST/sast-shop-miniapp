import { View, Swiper, SwiperItem, Image, Button, ScrollView,Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import { useEffect ,useState} from 'react'
import './index.scss'
import Taro from '@tarojs/taro'

export default function ProductDetail() {
  const imgState =[
    img1,
    img2,
    img3,
    img4,
  ]
    
  console.log(imgState);
  
  const [title,setTitle]=useState( '南京邮电大学校科协 SAST 2023 纪念定制短袖')
  const [price,setPrice]=useState('99')
  const [description,setDescription]=useState('商品的详情介绍')
  const [type,setType]=useState('卡其色 深蓝色')
  const [image,setImage]=useState<Array<any>>(imgState)


  function getDate(id:any){
    Taro.request({
      url: `http://127.0.0.1:4523/m1/2655521-0-default/user/productInfo/${id}`,
      method: 'GET',
      header:{
        'content-type': 'application/json'
      },
      success: (res) => {
            console.log(res.data);
            setPrice(res.data.price)
            setDescription(res.data.description)
            setTitle(res.data.title)
            setType(res.data.type)
            setImage(res.data.data.image)
          },
      fail:(error)=>{
        console.log(error); 
      }
    })
  }
  useEffect(() => {
      getDate(1)  
    }, [])
  
  

  useLoad(() => {
    console.log('Page loaded.')
  })

  const swiperitem=image.map(img=><SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img}></Image></SwiperItem>)
  return (
    <View
    style='overflow:hidden'
    >
      <Swiper
        className='swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        display-multiple-items
        >
          {swiperitem}
          {/* {
          image.map(img=> {
            return (  <SwiperItem className='swiper-item'>
            <Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={img}></Image>
            </SwiperItem>)
          }) 
        } */}
           
 
        {/* <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={image[0]}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={image[1]}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={image[2]}></Image></SwiperItem>
        <SwiperItem className='swiper-item'><Image mode='aspectFit' style='width:100%;height:100% ' className='img-item' src={image[3]}></Image></SwiperItem> */}
      </Swiper>
        <View className="good-introduce">{title}</View>
        <View className="good-price">￥{price}</View>
        <Button className='good-button'>立即购买</Button>

        <View className='type'>
          <View className='type-view'>颜色<Text className='type-item'>{type}</Text></View>
        </View>

        <View className='datail'>商品详情</View>

        <View className='text-detail'>
          {description}
        </View>

        {/* <ScrollView
          className='scrollview'
          scrollY
          lowerThreshold={50}
          style='height:1200px width:100%'
          showScrollbar={false}
          enhanced={true}
        >
          <View className='long-picture'>
            <Image className='detail-picture' src={detail} mode='widthFix'></Image>
          </View>
        </ScrollView> */}
    </View>
  )
}
