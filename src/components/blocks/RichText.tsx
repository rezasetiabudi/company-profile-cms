import React from 'react'

interface RichTextProps {
  content: any
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div className={`prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-accent-600 prose-strong:text-gray-900 ${className}`}>
      {renderNodes(content.root.children)}
    </div>
  )
}

function renderNodes(nodes: any[]): React.ReactNode[] {
  return nodes.map((node, index) => {
    if (node.type === 'heading') {
      const Tag = node.tag || 'h2'
      return (
        <Tag key={index} className="font-heading font-semibold text-gray-900 mt-8 mb-4">
          {renderChildren(node.children)}
        </Tag>
      )
    }

    if (node.type === 'paragraph') {
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {renderChildren(node.children)}
        </p>
      )
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="list-disc list-inside text-gray-600 mb-4 space-y-1">
          {renderChildren(node.children)}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="mb-1">
          {renderChildren(node.children)}
        </li>
      )
    }

    return null
  })
}

function renderChildren(children: any[]): React.ReactNode[] {
  if (!children) return []

  return children.map((child, index) => {
    if (child.type === 'text') {
      let text: React.ReactNode = child.text

      if ((child.format & 1) !== 0) {
        text = <strong key={index}>{text}</strong>
      }
      if ((child.format & 2) !== 0) {
        text = <em key={index}>{text}</em>
      }

      return <span key={index}>{text}</span>
    }

    if (child.type === 'heading') {
      const Tag = child.tag || 'h2'
      return (
        <Tag key={index} className="font-heading font-semibold text-gray-900 mt-6 mb-3">
          {renderChildren(child.children)}
        </Tag>
      )
    }

    if (child.type === 'paragraph') {
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {renderChildren(child.children)}
        </p>
      )
    }

    return null
  })
}
