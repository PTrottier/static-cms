import isHotkey from 'is-hotkey';
import React from 'react';

import Label from '@staticcms/core/components/common/field/Label';
import Select from '@staticcms/core/components/common/select/Select';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC } from 'react';

import './SettingsPane.css';

export const classes = generateClassNames('WidgetCodeSettings', ['root']);

interface SettingsSelectProps {
  type: 'language';
  label: string;
  placeholder?: string;
  uniqueId: string;
  value: {
    value: string;
    label: string;
  };
  options: {
    value: string;
    label: string;
  }[];
  onChange: (newValue: string) => void;
}

const SettingsSelect: FC<SettingsSelectProps> = ({
  value,
  label,
  placeholder,
  options,
  onChange,
  uniqueId,
  type,
}) => {
  const handleChange = (newValue: string | number | (string | number)[]) => {
    if (typeof newValue === 'string') {
      onChange(newValue);
    }
  };

  return (
    <div>
      <Label htmlFor={`${uniqueId}-select-${type}-label`} disabled={false}>
        {label}
      </Label>
      <Select
        value={value.value}
        label={value.value}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export interface SettingsPaneProps {
  hideSettings: () => void;
  uniqueId: string;
  languages: {
    value: string;
    label: string;
  }[];
  language: {
    value: string;
    label: string;
  };
  allowLanguageSelection: boolean;
  onChangeLanguage: (lang: string) => void;
}

const SettingsPane: FC<SettingsPaneProps> = ({
  hideSettings,
  uniqueId,
  languages,
  language,
  onChangeLanguage,
}) => {
  return (
    <div onKeyDown={e => isHotkey('esc', e) && hideSettings()} className={classes.root}>
      <SettingsSelect
        type="language"
        label="Language"
        placeholder="Select language"
        uniqueId={uniqueId}
        value={language}
        options={languages}
        onChange={onChangeLanguage}
      />
    </div>
  );
};

export default SettingsPane;
