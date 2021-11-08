import { useEffect, useState } from 'react'
import { v4 as UUID } from 'uuid'

const data: Array<Data> = []

class Member {
    id: string
    setState?: React.Dispatch<React.SetStateAction<boolean>>
    condition?: boolean

    constructor(id: string, setState?: React.Dispatch<React.SetStateAction<boolean>>, condition?: boolean) {
        this.id = id
        this.setState = setState
        this.condition = condition
    }
}

class Data {
    group: string
    members: Array<Member>
    length: number

    constructor(group: string, members: Array<Member>) {
        this.group = group
        this.members = members
        this.length = members.length
    }

    push(member: Member) {
        this.members.push(member)
        this.length += 1
    }

    splice(start: number, deleteCount: number) {
        this.members.splice(start, deleteCount)
        this.length -= deleteCount
    }

    forEach(callbackFn: (value: Member, index: number) => void){
        this.members.forEach(callbackFn)
    }

    findIndex(predicate: (value: Member, index: number) => unknown) {
        return this.members.findIndex(predicate)
    }
}

class Binder {
    #id: string | null
    #group: string

    constructor(group: string, id: string | null) {
        this.#id = id
        this.#group = group
    }

    dispatch() {
        const index = data.findIndex(o => o.group === this.#group)
        if (index >= 0) {
            data[index].forEach((member: Member) => {
                if (member.setState) member.setState(s => {
                    if(member.condition !== undefined) {
                        if (s === member.condition && member.id !== this.#id) return !s
                    } else {
                        if (member.id !== this.#id) return !s
                    }
                    return s
                })
            })
        }
    }
}

export const useBinder = (group: string, setState?: React.Dispatch<React.SetStateAction<boolean>>, condition?: boolean) => {
    const [binder, setBinder] = useState(new Binder(group, null))

    useEffect(() => {
        const index = data.findIndex(o => o.group === group)
        const member = new Member(UUID(), setState, condition)

        if (index >= 0) {
            data[index].push(member)
        } else {
            data.push(new Data(group, [member]))
        }

        setBinder(new Binder(group, member.id))

        return () => {
            if (index >= 0) {
                if (data[index].length === 1) {
                    data.splice(index, 1)
                } else {
                    const idx = data[index].findIndex(o => o.id === member.id)
                    data[index].splice(idx, 1)
                }
            } else {
                const idx = data.findIndex(o => o.group === group)
                if (data[idx].length === 1) {
                    data.splice(idx, 1)
                } else {
                    const index = data[idx].findIndex(o => o.id === member.id)
                    data[idx].splice(index, 1)
                }
            }
        }
    }, [group, setState, condition])

    return binder
}