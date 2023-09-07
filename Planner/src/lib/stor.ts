import { writable } from "svelte/store"

export enum Visible {
    active,
    inactive,
    all
}

interface PlanListItem {
    text: string
    status: boolean
    visible: boolean
}

interface PlanList {
    active: number
    list: PlanListItem[]
}

function getActiveCount(list: PlanListItem[]): number {
    return list.reduce((sum, c) => sum + (c.status ? 1 : 0), 0)
}

function initPlanList() {
    const { subscribe, update } = writable<PlanList>({ active: 0, list: [] })

    return {
        subscribe,
        add: (value: PlanListItem) => update((el) => {
            el.list.push(value)
            el.active = getActiveCount(el.list)
            return el
        }),
        del: (index: number) => update((el) => {
            el.list.splice(index, 1)
            el.active = getActiveCount(el.list)
            return el
        }),
        clr: () => update((el) => {
            for (let i = 0; i < el.list.length; i++) {
                if (el.list[i].status) {
                    el.list.splice(i--, 1)
                }
            }
            el.active = getActiveCount(el.list)
            return el
        }),
        clrAll: () => update((el) => {
            el.list.splice(0, el.list.length)
            el.active = 0
            return el
        }),
        check: (index: number) => update((el) => {
            el.list[index].status = !el.list[index].status
            el.active = getActiveCount(el.list)
            return el
        }),
        checkAll: () => update((el) => {
            el.list.forEach((e) => {
                e.status = true
            })
            el.active = getActiveCount(el.list)
            return el
        }),
        visible: (type: Visible) => update((el) => {
            el.list.forEach((e) => {
                switch (type) {
                    case Visible.active:
                        e.visible = e.status == true
                        break
                    case Visible.inactive:
                        e.visible = e.status == false
                        break
                    case Visible.all:
                        e.visible = false
                        break
                }
            })
            return el
        }),
    }
}
export const planList = initPlanList()
