## 설치 및 실행 방법

- 라이브러리 설치
  ```bash
  npm install
  ```
- 실행
  ```bash
  npm start
  ```

## 구현

- 첫 번째 빈칸 오픈 시 지뢰가 터지지 않음
- 게임 타이머 (우측)
- 남은 지뢰 갯수 (좌측)
- 우클릭 시 깃발 기능
- 난이도 변경 기능
- 난이도 시 난이도 정보 저장 (마지막에 사용한 난이도 유지)

## 참고 코드

### 타이머 구현

- [React 스톱워치 구현하기(TS)](https://doooodle932.tistory.com/127)

  ```tsx
  import { useState, useEffect } from "react";

  const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let interval: NodeJS.Timer | undefined;

      if (isRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [isRunning]);

    return (
      <div>
        <time>
          {`0${Math.floor((time / 60000) % 60)}`.slice(-2)} :{" "}
          {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}
        </time>
        <div>
          <button type="button" onClick={() => setIsRunning(true)}>
            Start
          </button>
          <button type="button" onClick={() => setIsRunning(false)}>
            Stop
          </button>
          <button type="button" onClick={() => setTime(0)}>
            Reset
          </button>
        </div>
      </div>
    );
  };

  export default StopWatch;
  ```

### 지뢰 보드 구현 Grid

- [CSS Grid 완벽 가이드](https://www.heropy.dev/p/c6ROLZ)

  ```css
  .container {
    display: grid;
    grid-template-rows: 1행크기 2행크기 ...;
    grid-template-rows: [선이름] 1행크기 [선이름] 2행크기 [선이름] ...;
  }
  ```

### 모달 창

- [react-modal](https://github.com/reactjs/react-modal)

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import Modal from "react-modal";

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#yourAppElement");

  function App() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = "#f00";
    }

    function closeModal() {
      setIsOpen(false);
    }

    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }

  ReactDOM.render(<App />, appElement);
  ```

### 우클릭 이벤트

- [React에서 우클릭 이벤트 사용하기](https://velog.io/@chanpoong/React%EC%97%90%EC%84%9C-%EC%9A%B0%ED%81%B4%EB%A6%AD-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

  ```
  onContextMenu={props.onClickOpenDeleteModal}
  ```

### 숫자를 정해진 자리로 표시하기

- [[js] 문자열 앞 혹은 뒤에 자리수만큼 특정 문자(0, 공백) 채우기](https://computer-science-student.tistory.com/682)

  ```js
  var num = 123;
  console.log(String(num).padStart(5, "0")); // '00123'

  var text = "abc";
  console.log(text.padStart(5, " ")); // '  abc'
  ```
