import { ProcessingStyled } from './styles';
import * as React from 'react';
import ProcessorIcon from '../ProcessorIcon';

interface IProcessor {
  title?: string;
}

const Processing = (props: IProcessor) => (
  <ProcessingStyled {...props}>
    <ProcessorIcon />
    {props.title}
  </ProcessingStyled>
);

export default Processing;
