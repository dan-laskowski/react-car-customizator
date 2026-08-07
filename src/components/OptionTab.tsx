import { JSX } from 'react';
import { Tab } from '@headlessui/react';
import Option from './Option';

interface OptionTabProps {
  label: string;
}

function OptionTab({ label }: OptionTabProps): JSX.Element {
  return (
    <Tab>{({ selected }) => <Option selected={selected}>{label}</Option>}</Tab>
  );
}

export default OptionTab;
