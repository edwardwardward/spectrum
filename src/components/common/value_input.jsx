import React, { PropTypes, Component } from 'react';
import { Form, Button, Input, Label } from 'semantic-ui-react';
import { parseBigNumber } from '~/helpers/stringUtils';
import CryptoPrice from '~/components/common/crypto_price';

export default class ValueInput extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    sendAll: PropTypes.object,
    label: PropTypes.string,
  }
  static defaultProps = {
    sendAll: false,
    label: undefined,
  }
  render() {
    const { label: labelText, formData, name, formChange, color, symbol, sendAll } = this.props;
    const showSendAll = sendAll && sendAll.toNumber() > 0;
    const value = formData[name] || '';
    return (
      <Form.Field>
        {labelText && <label htmlFor={name}>{labelText}</label>}
        <Input
          fluid
          className="labeled"
          type="number"
          placeholder="e.g. `5`"
          step="any"
          name={name}
          onChange={formChange}
          action={showSendAll}
          value={value}
        >
          <Label content={symbol} color={color} />
          <input />
          {showSendAll &&
            <Button
              basic
              icon="plus"
              content={`Send All ${parseBigNumber(sendAll)}`}
              onClick={(e) => {
                e.preventDefault();
                formChange({ name, value: sendAll });
              }}
            />
          }
        </Input>
        {value && <CryptoPrice symbol={symbol} amount={parseFloat(value)} />}
      </Form.Field>
    );
  }
}