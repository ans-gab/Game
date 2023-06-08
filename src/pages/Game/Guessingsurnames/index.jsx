import React, { useRef, useState } from 'react'
import { Space, Button, Swiper, ProgressBar, Modal, SearchBar } from 'antd-mobile'
import { firstName } from '../../../common/local'
import './index.css'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'
const Guessingsurnames = () => {
  // 将数组中的每个数转换成7位二进制数，并用0在左边补齐
  const binaryArr = firstName.map((item, index) => index.toString(2).padStart(8, '0'));
  // 定义一个空数组result，用于存储每一位二进制数中为1的数的下标
  const result = [];
  // 定义一个ref，用于获取Swiper组件的实例
  const ref = useRef(null)
  // 打印百家姓的长度
  console.log(firstName.length);
  // 遍历每一位二进制数
  for (let i = 0; i < 8; i++) {
    // 定义一个空数组subArr，用于存储当前位为1的数的下标  
    const subArr = [];
    // 遍历所有的二进制数
    for (let j = 0; j < binaryArr.length; j++) {
      // 如果当前位为1，将该数的下标存入subArr数组中
      if (binaryArr[j][i] === '1') {
        subArr.push(firstName[j]);
      }
    }
    // 将subArr数组存入result数组中
    result.push(subArr);
  }
  // 记录当前页数
  const [pages, setPages] = useState(0);
  // 使用useState来跟踪用户的点击，并将1或0添加到clicks数组中
  const [clicks, setClicks] = useState([]);
  // 用户输入框输入的值
  const [inputvalue, setInputvalue] = useState();
  // 处理用户点击按钮的函数
  const handleClick = (value) => {
    // 仅在数组长度小于7时添加值
    if (clicks.length < 8) {
      setClicks([...clicks, value]);
    }
  }
  // 将二进制数转换为十进制数的函数
  const binaryToDecimal = (binary) => {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
      decimal += binary[i] * Math.pow(2, binary.length - 1 - i);
    }
    return firstName[decimal];
  }
  return (
    <div className='content'>
      <div className='content-sec2'>

        <SearchBar
          placeholder='快速查找'
          showCancelButton
          style={{
            '--border-radius': '100px',
          }}
          value={inputvalue}
          onChange={(e) => { setInputvalue(e) }}
        />

        <Swiper allowTouchMove={false} ref={ref} indicator={() => null} loop >
          {
            result.map((innerArray, index) => (
              <Swiper.Item key={index}>
                <ul className='card-content'>
                  {
                    innerArray.map((item, index) => (
                      <li className={item == inputvalue ? 'card-item active' : 'card-item'} key={index} >{item}</li>
                    )
                    )
                  }
                </ul>
              </Swiper.Item>
            ))
          }
        </Swiper>
        <Space block direction='vertical'>
          <ProgressBar
            percent={pages * 100 / 8}
            text={'已完成' + pages + '/8 页'}
            text-width='100'
            style={{
              '--fill-color': 'var(--adm-color-success)',
            }}
          />
        </Space>
        {/* 添加上一张和下一张按钮 */}
        <Space align='center' className='chooseIs'>
          <Button style={{ width: '100px' }} disabled={pages >= 8} onClick={() => {
            handleClick(1); ref.current?.swipeNext(); setPages(pages + 1);
          }}>
            有
          </Button>
          <Button style={{ width: '100px' }} disabled={pages >= 8} onClick={() => {
            handleClick(0); ref.current?.swipeNext(); setPages(pages + 1);
          }}>
            没有
          </Button>
          <Button style={{ width: '100px' }} onClick={() => {
            pages >= 8 ? (Modal.show({
              content: '您猜中的姓氏为：' + binaryToDecimal(clicks),
              closeOnMaskClick: true,
            })) : (Modal.show({
              content: '请选择完毕之后再点击确认',
              closeOnMaskClick: true,
            }))
            pages >= 8 && setPages(0);
            pages >= 8 && setClicks([]);
            console.log(clicks, pages);
          }}>
            确认
          </Button>
        </Space>

      </div>
    </div >
  )
}

export default Guessingsurnames