import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { dropdownInterface } from '@/@types/dropdownButton';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

const DropdownButton = ({ name, menuItems, chevronIcon = true }: dropdownInterface) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <button
                ref={anchorRef}
                id='composition-button'
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                className='rounded-full bg-slate-200 py-2 px-3 mr-1'
            >
                <div className='flex'>
                    <p>{name}</p>
                    {chevronIcon ? (
                        <div>
                            {open ? (
                                <ChevronUpIcon className='h-6 w-6 ml-1' />
                            ) : (
                                <ChevronDownIcon className='h-6 w-6 ml-1' />
                            )}
                        </div>
                    ) : (
                        <AdjustmentsHorizontalIcon className='h-6 w-6 ml-1' />
                    )}
                </div>
            </button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                {menuItems.length > 0 ? (
                                    <MenuList
                                        autoFocusItem={open}
                                        id='composition-menu'
                                        aria-labelledby='composition-button'
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {menuItems.map((item) => (
                                            <MenuItem key={item.name} onClick={handleClose}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                ) : (
                                    <MenuList
                                        autoFocusItem={open}
                                        id='composition-menu'
                                        aria-labelledby='composition-button'
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>No options</MenuItem>
                                    </MenuList>
                                )}
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default DropdownButton;
