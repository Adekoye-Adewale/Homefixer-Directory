import { PortableTextBlock } from '@portabletext/react'

export function portableTextToPlaintext(blocks: PortableTextBlock[] | undefined | null): string {
        if (!blocks || blocks.length === 0) {
                return "";
        }

        return blocks
                .map(block => {
                        if (block._type !== 'block' || !block.children) {
                                return '';
                        }
                        return block.children.map(child => child.text).join('');
                })
                .join('\n\n');
}
