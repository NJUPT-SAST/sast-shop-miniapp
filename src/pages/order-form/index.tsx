import { View, Text, Button, Input, Radio, Label, RadioGroup ,Image } from '@tarojs/components'
import { useLoad ,getCurrentInstance , getStorageSync} from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'
import"./number.scss"
import PagePicker from '../../componments/TypePicker'
import { useState ,useEffect , Component} from 'react'
import box from '../../assets/images/Box.jpg'


export default function OrderForm() {
  const sentid=4
  // const sentid=Taro.getCurrentInstance().router?.params.id
  const sentprice=Taro.getCurrentInstance().router?.params.price

  const [nameValue,setNameValue]=useState('')
  const [phoneValue,setPhoneValue]=useState('')
  const [addressValue,setAddressValue]=useState('')
  const [emailValue,setEmailValue]=useState('')
  const [send,setSend]=useState(false)

  useEffect(() => {
    if(Taro.getStorageSync('usermessage')===''){
      //将用户的信息进行填写
      Taro.request({
        url:'https://wechatpayment.sast.fun/user/information',
                method:'GET',
                header:{
                  'content-type':'application/json',
                  'TOKEN':token
                },
                success:(res)=>{
                  console.log(res.data.data)
                  setNameValue(res.data.data.name)
                  setPhoneValue(res.data.data.phone)
                  setAddressValue(res.data.data.postAddress)
                  setEmailValue(res.data.data.email)
                },
                fail:(err)=>{
                  console.log(err)
                },
      })
    }else{
      setNameValue(Taro.getStorageSync('usermessage').name)
      setPhoneValue(Taro.getStorageSync('usermessage').phone)
      setEmailValue(Taro.getStorageSync('usermessage').email)
      setAddressValue(Taro.getStorageSync('usermessage').postAddress)
    }
  }, [])

  function handleSuccess(){
    Taro.showToast({
      title: '支付成功',
      icon:'success',
      duration: 2000
    })
  }
  

  function handleFail(){
    Taro.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 2000,
        })
  }
  
  const sendPrice=send?12:0

  const[Num,setNum]=useState(1);
    function add(){
        setNum(Num+1);
    }
    function drease(){
        if(Num>0){
            setNum(Num-1);
        }
    }

    const oneprice=sentprice
    const productPrice=oneprice*Num
    const totalPrice=sendPrice+productPrice

  const [type, setType] = useState({
    selector: ['米其色', '深蓝色'],
    selectorChecked: 0
  })
  const [size,setSize]=useState({
    selector: ['S', 'M','L','XL','2XL','3XL'],
    selectorChecked: 0
  })

  useLoad(() => {
    // console.log('Page loaded.')
  })


  const typeValue=type.selectorChecked 
  const sizeValue =size.selectorChecked
  const countValue = Num
  const needPostValue = send?1:0

  // const token=getStorageSync('TOKEN')
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvaHBqdzVCMjZQeGZzUGlVWlIzMkI1QVc3aTQwIiwic2Vzc2lvbl9rZXkiOiJGZWlwS2VNY0JWaEdwb3hLT3Q5bTlnPT0iLCJleHAiOjMxMTIwODQ1MDMzNzR9.s5vcJfEZvYNZ_huBGfmbQEsj_nBfY_mFoU1q9ueezJc"



  function btClick(){
    // let usermessage=Taro.getStorageSync('usermessage');
    const postdata={
      name:nameValue,
      phone:phoneValue,
      email:emailValue,
      type:typeValue,
      size:sizeValue,
      count:countValue,
      needPost:needPostValue,
      postAddress:addressValue,
      productId:sentid,
    } 


    if(nameValue==''||phoneValue==''||emailValue==''||(needPostValue==1&&addressValue=='')){
      Taro.showModal({
        title: '提示',
        content: '请将信息填写完整',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      //创建表单并发起支付
      Taro.request({
        url:`https://wechatpayment.sast.fun/user/order`,
        data:postdata,
        method:'POST',
        header:{
          'content-type':'application/json',
          'TOKEN':token,
        },
        success:(res)=>{
          console.log(res.data)
          const errReason=res.data.errMsg
          if(res.data.success==false){
            Taro.showModal({
              title: '提示',
              content: errReason,
            })
          }else{
          const order_id=res.data.data.order_id
          Taro.request({
            url:`https://wechatpayment.sast.fun/user/pay/${order_id}`,
            method:'POST',
            header:{
              'content-type':'application/json',
              'TOKEN': token
            },
            success:(res)=>{
              console.log(res.data)
              Taro.requestPayment({
                timeStamp:res.data.data.timeStamp,
                nonceStr:res.data.data.nonceStr,
                package:res.data.data.package,
                signType:'MD5',
                paySign:res.data.data.paySign,
                success:()=>{
                  handleSuccess()
                },
                fail:()=>{
                  handleFail()
                }
              })
            },
            fail:(err)=>{
              console.log(err)
            },
          })
          }
        },
        fail:(err)=>{
          console.log(err)
        },
      })

      //数值改变 发起请求
      const usermessage=Taro.getStorageSync('usermessage')
      if((nameValue!=usermessage.name) || (phoneValue!=usermessage.phone) || (emailValue!=usermessage.email) || (addressValue!=usermessage.postAddress)){
        //保存一份信息
        Taro.setStorageSync('usermessage',{
          name:nameValue,
          phone:phoneValue,
          email:emailValue,
          postAddress:addressValue
        })

      Taro.request({
        url:'https://wechatpayment.sast.fun/user/information',
        data:{
          name:nameValue,
          phone:phoneValue,
          postAddress:addressValue,
          email:emailValue,
        },
        method:'POST',
        header:{
          'content-type':'application/json',
          'TOKEN': token
        },
        success:(res)=>{
          console.log(res.data)         
        },
        fail:(err)=>{
          console.log(err)
        },
      })
      }
  }
}
  

  
  return (
    <>
      <View className='order-title'>
        <Image className='title-picture' src={box} ></Image>
        <Text className='title-text'>编辑收货详情</Text>
      </View>
      <View className='order-form'>
        <View className='order-box'>
          <View className='form-item'>
            <Text>收货人</Text>
            <Input value={nameValue} onInput={(e)=>{setNameValue(e.detail.value)}} className='order-input' type='text' placeholder='用户姓名'></Input>
          </View>

          <View className='form-item'>
            <Text>手机号码</Text>
            <Input value={phoneValue} onInput={(e)=>{setPhoneValue(e.detail.value)}} type='text' placeholder='用户号码'></Input>
          </View>

          <View className='form-item'>
            <Text>用户邮箱</Text>
            <Input value={emailValue} onInput={(e)=>{setEmailValue(e.detail.value)}} type='text' placeholder='用户邮箱'></Input>
          </View>

          
          <PagePicker title='商品类型' typeSetter={setType} pickerConfig={type} />

          <PagePicker title='尺码' typeSetter={setSize} pickerConfig={size} />

          <View className='form-item'>
            <Text>邮寄</Text>
            <RadioGroup className='location'>
              <Label>
                <Radio onClick={()=>{setSend(true)}} checked={send} value='true'>是</Radio>
              </Label>
              <Label>
                <Radio onClick={()=>{setSend(false)}} checked={!send} value='false'>否</Radio>
              </Label>
            </RadioGroup>
          </View>

          {send&&
          <View className='form-item'>
            <Text>邮寄地址</Text>
            <Input value={addressValue} onInput={(e)=>{setAddressValue(e.detail.value)}} type='text' placeholder='地址'></Input>
          </View>}

          <View className="picker-box">
            <Text>购买数量</Text>
                <Button className="button1" onClick={()=>drease()}>-</Button>
                    <Text className="number">{Num}</Text>
                <Button className="button2" onClick={()=>add()}>+</Button>
          </View>
          

        </View>

      </View>
      <View className='order-price'>
        <View className='good-line'>
          <Text className='good-line-item'>商品金额</Text>
          <Text className='good-price'>￥{productPrice}</Text>
        </View>
        <View className='send-line'>
          <Text className='send-line-item'>运费</Text>
          <Text className='send-price'>￥{sendPrice}</Text>
        </View>
      </View>

      <View className='Price'>
        <Text className='Price-txet'>合计: ￥{totalPrice}</Text>
        <Button onClick={btClick} className='order-button'>提交订单</Button>
      </View>
    </>

  )
}


