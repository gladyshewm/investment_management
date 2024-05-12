import * as Select from '@radix-ui/react-select';
import './select.css';
import React, { forwardRef } from "react";
import { Theme, Flex, Text, Button } from '@radix-ui/themes';
import HouseIcon from '../icons/HouseIcon';
const SelectDemo = () => {
    const data = {
        light: { label: 'Light', icon: <HouseIcon /> },
        dark: { label: 'Dark', icon: <HouseIcon /> },
    };
    const [value, setValue] = React.useState('light');
    return (
        <Theme>
            <Select.Root value={value} onValueChange={setValue}>
                <Select.Trigger>
                    <Flex as="span" align="center" gap="2">
                        {data[value].icon}
                        {data[value].label}
                    </Flex>
                </Select.Trigger>
                <Select.Content position="popper">
                    <Select.Item value="light">Light</Select.Item>
                    <Select.Item value="dark">Dark</Select.Item>
                </Select.Content>
            </Select.Root>
        </Theme>
    );
};

/* 
const SelectDemo = () => (
    <Select.Root>
        <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select a fruit…" />
            <Select.Icon className="SelectIcon">
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <Select.Group>
                        <Select.Label className="SelectLabel">Fruits</Select.Label>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </Select.Group>

                    <Select.Separator className="SelectSeparator" />

                    <Select.Group>
                        <Select.Label className="SelectLabel">Vegetables</Select.Label>
                        <SelectItem value="aubergine">Aubergine</SelectItem>
                        <SelectItem value="broccoli">Broccoli</SelectItem>
                        <SelectItem value="carrot" disabled>
                            Carrot
                        </SelectItem>
                        <SelectItem value="courgette">Courgette</SelectItem>
                        <SelectItem value="leek">Leek</SelectItem>
                    </Select.Group>

                    <Select.Separator className="SelectSeparator" />

                    <Select.Group>
                        <Select.Label className="SelectLabel">Meat</Select.Label>
                        <SelectItem value="beef">Beef</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="lamb">Lamb</SelectItem>
                        <SelectItem value="pork">Pork</SelectItem>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);
*/

const SelectItem = forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className={'SelectItem'} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectDemo;