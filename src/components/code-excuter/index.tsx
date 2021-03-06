import React, {useState} from 'react';
import styled from '@emotion/styled';

interface IProps{
  initialCode: string;
}

const StyledWarapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  height: 360px;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  flex: 1;
  border-radius: 4px;
  margin: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CardHeader = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #333;
  background-color: #f5f5f5;
`;
const Button = styled.button`
  display: inline-block;
  padding: 6px 12px;
  user-select: none;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  background-color: #fff;
  
  &.run{
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    float: right;
    cursor: pointer;
  }
`;

const CardContent = styled.div`
  padding: 0;
  flex: 1;
  &.result{
    padding: 16px;
    overflow-y: auto;
  }
`;

const TextArea = styled.textarea({
  width: 'calc(100% - 5px)',
  height: '300px',
  border: 'none',
  outline: 'none',
  overflow: 'visible'
});

const CodeExcuter: React.FC<IProps> = function(props){
  const {
    initialCode
  } = props;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState('');

  const excute = () => {
    let retStr = '';
    try {
      const ret = eval(code);
      retStr = JSON.stringify(ret, null, 2);
    } catch (error) {
      console.log('error message: ', error);
      retStr = error.toString();
    }
    setResult(retStr);
  }

  return(
    <StyledWarapper>
      <Card className="sourcecode">
        <CardHeader>
          <Button>源代码</Button>
          <Button className="run" onClick={excute}>点击运行</Button>
        </CardHeader>
        <CardContent>
          <TextArea onChange={(e: any) => setCode(e.target.value)}>
            {code}
          </TextArea>
        </CardContent>
      </Card>
      <Card className="console">
        <CardHeader>
          <Button>运行结果</Button>
        </CardHeader>
        <CardContent className="result">
          <pre>{result}</pre>
        </CardContent>
      </Card>
    </StyledWarapper>
  )
}

export default CodeExcuter;