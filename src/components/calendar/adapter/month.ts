import {
  addYears,
  eachMonthOfInterval,
  endOfYear,
  isAfter,
  isBefore,
  isSameMonth,
  isWithinInterval,
  startOfYear,
  subYears,
} from 'date-fns'
import {
  defineAdapter,
  formatDate,
} from './adapter'

function getInterval (date: Date) {
  const start = startOfYear(date)
  const end   = endOfYear(date)

  return {
    start,
    end,
  }
}

export default defineAdapter({
  getItems ({ cursor, start, end, min, max }) {
    return eachMonthOfInterval(getInterval(cursor.value))
      .map((date) => {
        const isDisabled = !isSameMonth(min.value, date)
          && !isSameMonth(max.value, date)
          && !isWithinInterval(date, { start: min.value, end: max.value })

        const isHead = isSameMonth(start.value, date)
        const isTail = isSameMonth(end.value, date)

        return {
          value   : date,
          text    : formatDate(date, 'MMM'),
          disabled: isDisabled,
          readonly: false,
          head    : isHead,
          tail    : isTail,
          active  : isHead || isTail,
        }
      })
  },

  getTitle ({ cursor }) {
    return cursor.value.getFullYear().toString()
  },

  getNextCursor ({ cursor }) {
    return addYears(cursor.value, 1)
  },

  getPrevCursor ({ cursor }) {
    return subYears(cursor.value, 1)
  },

  canNext (context) {
    const max  = context.max.value
    const date = this.getNextCursor(context)

    return !max || isBefore(date, max) || isWithinInterval(max, getInterval(date))
  },

  canPrev (context) {
    const min  = context.min.value
    const date = this.getPrevCursor(context)

    return !min || isAfter(date, min) || isWithinInterval(min, getInterval(date))
  },
})
