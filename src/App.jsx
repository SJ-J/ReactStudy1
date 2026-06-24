import { useState } from 'react'
import './App.css'

function App() {

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const currDate = `${year}년 ${month}월 ${day}일`;

  let mainTitle = '⚡피카츄라이츄파이썬리액트';

  let [postTitle, setPostTitle] = useState(['견코비는 C++ 하렴…🧑‍🎓', '뚱코비뜨끈궁둥이무침🫧', '냥코비코떼먹기🍪']);
  let [goodCnt, setGoodCnt] = useState(postTitle.map( ()=>0 ));
  let [postModal, setPostModal] = useState('off');
  let [postNum, setPostNum] = useState(0);
  let [postDate, setPostDate] = useState(postTitle.map( ()=>'2026년 06월 16일' ));

  let newTitle = '견코비는 Python 하렴…🧑‍🎓';
  let [insertTitle, setInsertTitle] = useState('');

  let [smileCovy, setSmileCovy] = useState('off');
  let [waitCovy, setWaitCovy] = useState('off');

  
  // 가나다순 정렬 함수
  function abcSort() {
    let copy = [...postTitle];
    copy.sort();
    setPostTitle(copy);
  }

  // 제목 변경 함수
  function changeTitle(postNum, newTitle) {
    // 배열 내 포인터 변경을 위한 얕은 복사
    let copy = [...postTitle];
    copy[postNum] = newTitle;
    setPostTitle(copy);
  }

  // 좋아요 누적 함수
  function changeGoodCnt(i) {
    let copyGoodCnt = [...goodCnt];
    copyGoodCnt[i] = copyGoodCnt[i] + 1;
    setGoodCnt(copyGoodCnt);
  }

  // 글 등록 함수
  function insertTitles(insertTitle) {
    let copyTitle = [...postTitle];
    let copyDate = [...postDate];
    let copyGoodCnt = [...goodCnt];
    if (!insertTitle) {
      alert('제목을 입력해 주세요.');
      return;
    }
    setPostTitle(copyTitle.concat(insertTitle));
    setPostDate(copyDate.concat(currDate));
    setGoodCnt(copyGoodCnt.concat(0));
  }

  // 글 삭제 함수
  function deleteTitles(i) {
    let copyTitle = [...postTitle];
    let copyDate = [...postDate];
    let copyGoodCnt = [...goodCnt];
    setPostTitle(copyTitle.filter( (item, index) => index != i) );
    setPostDate(copyDate.filter( (item, index) => index != i) );
    setGoodCnt(copyGoodCnt.filter( (item, index) => index != i) );
    setPostModal('off');
  }

  return (
    <div className='App'>

      {/* 메인 제목 영역: JSX는 class=''가 아닌 className을 써야함 */}
      <div className='black-nav'>
        <h4 style={{color: 'rgb(188, 211, 245)', fontSize: '20px'}}>{ mainTitle } </h4>
      </div>

      {/* 상단 버튼 영역 */}
      <button className='spanBtn' onClick={ ()=>abcSort() }>가나다순 정렬</button>
      <button className='spanBtn' onClick={ ()=>changeTitle(postNum, newTitle) }>전공 바꿀래요🔀</button>

      {/* 콘텐츠 영역 */}
      {
        postTitle.map(function(list, i) {
          return (
            <li className='list' key={i} 
                onClick={ ()=>{setPostModal(postModal == 'on' && postNum == i ? 'off' : 'on'); setPostNum(i);} }>
              <h4>{ postTitle[i] } 
              <button className='goodBtn' 
                      onClick={ e=>{e.stopPropagation(); changeGoodCnt(i);} }>👍</button> { goodCnt[i] } 
              <button className='deleteBtn' onClick={ (e)=>{e.stopPropagation(); deleteTitles(i);} }> 삭제 </button>
              </h4>
              <p>{ postDate[i] }</p>
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
      { postModal == 'on' ? <Modal postTitle={postTitle} postNum={postNum} changeTitle={changeTitle} postDate={postDate} /> : null }
      { smileCovy == 'on' ? <SmileCovy /> : null }
      { waitCovy == 'on' ? <WaitCovy /> : null }

      <hr></hr>
      <div>
        <input className='inputArea' placeholder='게시글 제목을 입력해 주세요.' onChange={ (e)=>setInsertTitle(e.target.value) }></input>
        <button className='spanBtn' onClick={ ()=>insertTitles(insertTitle) }>등록</button>
      </div>

      
    </div>
  )
}

/* 컴포넌트 영역 */
function Modal(props) {   // 콘텐츠 모달
  let [inputModal, setInputModal] = useState('');
  
  return (
    <div className='modal'>
      <h4>{ props.postTitle[props.postNum] }</h4>
      <p>{ props.postDate[props.postNum] }</p>
      <p>내용</p>
      <input className='inputArea' placeholder='변경할 제목을 입력해 주세요.' onChange={ (e)=>setInputModal(e.target.value) }></input>
      <button className='spanBtn' onClick={ ()=>props.changeTitle(props.postNum, inputModal) }>제목 바꾸기</button>
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