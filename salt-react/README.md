### 각 레이어의 역활

#### App

```
데이터를 수집할 수 있다.
리덕스를 연결할 수 있다.
엔트리포인트와 라우터에서만 호출될 수 있다. 그외에 자식으로 사용할 수 없다.
컨테이너를 조합하거나 컴포넌트를 조합할 수 있다.
```

#### Container

```
데이터를 수집할 수 있다.
리덕스를 연결할 수 있다.
컴포넌트들의 묶음이다.
```

### Controller

```
데이터를 수집할 수 있다.
리덕스를 연결할 수 있다.
오직 로직만 구현할 수 있다.
```

#### Component

```
오직 템플릿을 위한 역활만 한다.
어떠한 값도 직접 가질 수 없다. 값은 부모로부터 위임받아 사용할 수 있다.
```