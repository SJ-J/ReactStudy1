import { useState } from 'react'
import './App.css'

function App() {

  let mainTitle = '⚡피카츄라이츄파이썬리액트';
  let [postTitle, setPostTitle] = useState(['견코비는 C++ 하렴…🧑‍🎓', '뚱코비뜨끈궁둥이무침🫧', '냥코비코떼먹기🍪']);
  let [goodCnt, setGoodCnt] = useState(postTitle.map( ()=>0 ));
  let [postModal, setPostModal] = useState('off');
  let [postNum, setPostNum] = useState(0);

  let [smileCovy, setSmileCovy] = useState('off');
  let [waitCovy, setWaitCovy] = useState('off');
  
  // 가나다순 정렬 함수
  function abcSort() {
    let copy = [...postTitle];
    copy.sort();
    setPostTitle(copy);
  }

  // 제목 변경 함수
  function changeTitle() {
    // 배열 내 포인터 변경을 위한 얕은 복사
    let copy = [...postTitle];
    copy[0] = '견코비는 Python 하렴…🧑‍🎓';
    setPostTitle(copy);
  }

  // 좋아요 누적 함수
  function changeGoodCnt(i) {
    let copy = [...goodCnt];
    copy[i] = copy[i] + 1;
    setGoodCnt(copy);
  }

  return (
    <div className='App'>

      {/* 메인 제목 영역: JSX는 class=''가 아닌 className을 써야함 */}
      <div className='black-nav'>
        <h4 style={{color: 'rgb(188, 211, 245)', fontSize: '20px'}}>{ mainTitle } </h4>
      </div>

      {/* 상단 버튼 영역 */}
      <button className='spanBtn' onClick={ ()=>abcSort() }>가나다순 정렬</button>
      <button className='spanBtn' onClick={ ()=>changeTitle() }>전공 바꿀래요🔀</button>

      {/* 콘텐츠 영역 */}
      {
        postTitle.map(function(list, i) {
          return (
            <li className='list' key={i} 
                onClick={ ()=>{setPostModal(postModal == 'on' && postNum == i ? 'off' : 'on'); setPostNum(i);} }>
              <h4>{ postTitle[i] } 
              <button className='goodBtn' 
                      onClick={ e=>{e.stopPropagation(); changeGoodCnt(i);} }>👍</button> { goodCnt[i] } </h4>
              <p>2026년 06월 16일</p>
            </li>
          )
        })
      }

      {/* 하단 버튼 영역 */}
      <button className='spanBtn' onClick={ ()=>setSmileCovy(smileCovy == 'on' ? 'off' : 'on') }>
        웃으면 복이 오는 코비🐶</button>
      <button className='spanBtn' onClick={ ()=>setWaitCovy(waitCovy == 'on' ? 'off' : 'on') }>
        의젓하게 신호등 기다리는 코비🐕‍🦺</button>

      {/* 콘텐츠, 버튼 토글: 조건문은 삼항연산자로 작성 */}
      { postModal == 'on' ? <Modal postTitle={postTitle} postNum={postNum} changeTitle={changeTitle} /> : null }
      { smileCovy == 'on' ? <SmileCovy /> : null }
      { waitCovy == 'on' ? <WaitCovy /> : null }
      
    </div>
  )
}

/* 컴포넌트 영역 */
function Modal(props) {   // 콘텐츠 모달
  return (
    <div className='modal'>
      <h4>{ props.postTitle[props.postNum] }</h4>
      <p>날짜</p>
      <p>내용</p>
      <button className='spanBtn' onClick={ props.changeTitle }>제목 바꾸기</button>
    </div>
  )
}

function SmileCovy() {   // 하단 버튼 1
  return (
    <div className='smileCovy'>
      <h4>웃는이미지넣을꾸임</h4>
      <p>여기에</p>
    </div>
  )
}

function WaitCovy() {   // 하단 버튼 2
  return (
    <div className='waitCovy'>
      <h4>의젓한이미지넣을것.임</h4>
      <p>여기에</p>
    </div>
  )
}

export default App