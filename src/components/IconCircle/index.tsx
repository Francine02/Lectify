import { cn } from '@/utils/cn';
import { FaFileAlt } from 'react-icons/fa';
import { IconCircleProps, IconConfig } from './IconCircleProps';
import { FaFileCircleQuestion } from 'react-icons/fa6';

export function IconCircle({ type }: IconCircleProps) {
    const iconStyle: Record<string, IconConfig> = {
        summary: {
            icon: FaFileAlt,
            bg: 'bg-purple-50',
            iconColor: 'text-purple-800',
        },
        quiz: {
            icon: FaFileCircleQuestion,
            bg: 'bg-indigo-50',
            iconColor: 'text-indigo-800',
        },
    };

    const { icon: Icon, bg, iconColor } = iconStyle[type];

    return (
        <div className={cn(bg, 'w-fit rounded-full p-5 mx-auto')}>
            <Icon className={cn(iconColor, 'size-10 ')} />
        </div>
    );
}
