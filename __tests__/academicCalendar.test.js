/* eslint-disable no-console */
import {
  acadYearStartDates,
  getAcadYear,
  getAcadSem,
  getAcadWeekName,
  getAcadWeekInfo,
} from '../src/academicCalendar';

console.warn = jest.genMockFn();

describe('acadYearStartDates', () => {
  it('has the start dates of 6 academic years', () => {
    expect(Object.keys(acadYearStartDates).length).toBe(6);
  });
});

describe('getAcadYear', () => {
  it('determines the correct start date for supported dates', () => {
    expect(getAcadYear(new Date('July 31, 2016')).year).toBe('15/16');
    expect(getAcadYear(new Date('August 1, 2016')).year).toBe('16/17');
    expect(getAcadYear(new Date('October 17, 2016')).year).toBe('16/17');
    expect(getAcadYear(new Date('October 17, 2017')).year).toBe('17/18');
  });

  it('gives defaults for unsupported dates', () => {
    // Earlier than supported year range.
    expect(getAcadYear(new Date('October 17, 2006'))).toBe(null);
    // Later than supported year range.
    expect(getAcadYear(new Date('October 17, 2106')).year).toBe('19/20');
  });
});

describe('getAcadSem', () => {
  it('determines the correct semester for supported weeks', () => {
    expect(getAcadSem(1)).toBe('Semester 1');
    expect(getAcadSem(15)).toBe('Semester 1');
    expect(getAcadSem(23)).toBe('Semester 1');
    expect(getAcadSem(24)).toBe('Semester 2');
    expect(getAcadSem(32)).toBe('Semester 2');
    expect(getAcadSem(40)).toBe('Semester 2');
    expect(getAcadSem(41)).toBe('Special Term I');
    expect(getAcadSem(43)).toBe('Special Term I');
    expect(getAcadSem(46)).toBe('Special Term I');
    expect(getAcadSem(47)).toBe('Special Term II');
    expect(getAcadSem(50)).toBe('Special Term II');
    expect(getAcadSem(52)).toBe('Special Term II');
  });

  it('gives null for unsupported weeks', () => {
    expect(getAcadSem(-1)).toBe(null);
    expect(getAcadSem(0)).toBe(null);
    expect(getAcadSem(54)).toBe(null);
    expect(getAcadSem(1000)).toBe(null);
    expect(console.warn).toBeCalled();
  });
});

describe('getAcadWeekName', () => {
  it('determines the correct semester for supported weeks', () => {
    expect(getAcadWeekName(1)).toEqual({ weekType: 'Instructional', weekNumber: 1 });
    expect(getAcadWeekName(3)).toEqual({ weekType: 'Instructional', weekNumber: 3 });
    expect(getAcadWeekName(7)).toEqual({ weekType: 'Recess', weekNumber: null });
    expect(getAcadWeekName(8)).toEqual({ weekType: 'Instructional', weekNumber: 7 });
    expect(getAcadWeekName(11)).toEqual({ weekType: 'Instructional', weekNumber: 10 });
    expect(getAcadWeekName(15)).toEqual({ weekType: 'Reading', weekNumber: null });
    expect(getAcadWeekName(16)).toEqual({ weekType: 'Examination', weekNumber: 1 });
    expect(getAcadWeekName(17)).toEqual({ weekType: 'Examination', weekNumber: 2 });
  });

  it('gives null for unsupported weeks', () => {
    expect(getAcadWeekName(-1)).toBe(null);
    expect(getAcadWeekName(0)).toBe(null);
    expect(getAcadWeekName(18)).toBe(null);
    expect(getAcadWeekName(1000)).toBe(null);
    expect(console.warn).toBeCalled();
  });
});

describe('getAcadWeekInfo', () => {
  it('determines the correct week info for supported weeks', () => {
    expect(getAcadWeekInfo(new Date('August 1, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Orientation', num: null,
    });
    expect(getAcadWeekInfo(new Date('August 8, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Instructional', num: 1,
    });
    expect(getAcadWeekInfo(new Date('August 14, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Instructional', num: 1,
    });
    expect(getAcadWeekInfo(new Date('September 12, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Instructional', num: 6,
    });
    expect(getAcadWeekInfo(new Date('September 19, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Recess', num: null,
    });
    expect(getAcadWeekInfo(new Date('September 27, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Instructional', num: 7,
    });
    expect(getAcadWeekInfo(new Date('November 11, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Instructional', num: 13,
    });
    expect(getAcadWeekInfo(new Date('November 14, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Reading', num: null,
    });
    expect(getAcadWeekInfo(new Date('November 21, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Examination', num: 1,
    });
    expect(getAcadWeekInfo(new Date('December 2, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Examination', num: 2,
    });
    expect(getAcadWeekInfo(new Date('December 7, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Vacation', num: 1,
    });
    expect(getAcadWeekInfo(new Date('December 28, 2016'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Vacation', num: 4,
    });
    expect(getAcadWeekInfo(new Date('January 4, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 1', type: 'Vacation', num: 5,
    });
    expect(getAcadWeekInfo(new Date('January 9, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Instructional', num: 1,
    });
    expect(getAcadWeekInfo(new Date('February 14, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Instructional', num: 6,
    });
    expect(getAcadWeekInfo(new Date('February 21, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Recess', num: null,
    });
    expect(getAcadWeekInfo(new Date('February 28, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Instructional', num: 7,
    });
    expect(getAcadWeekInfo(new Date('April 11, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Instructional', num: 13,
    });
    expect(getAcadWeekInfo(new Date('April 18, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Reading', num: null,
    });
    expect(getAcadWeekInfo(new Date('April 25, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Examination', num: 1,
    });
    expect(getAcadWeekInfo(new Date('May 2, 2017'))).toEqual({
      year: '16/17', sem: 'Semester 2', type: 'Examination', num: 2,
    });
    expect(getAcadWeekInfo(new Date('May 9, 2017'))).toEqual({
      year: '16/17', sem: 'Special Term I', type: 'Instructional', num: 1,
    });
    expect(getAcadWeekInfo(new Date('June 6, 2017'))).toEqual({
      year: '16/17', sem: 'Special Term I', type: 'Instructional', num: 5,
    });
    expect(getAcadWeekInfo(new Date('June 13, 2017'))).toEqual({
      year: '16/17', sem: 'Special Term I', type: 'Instructional', num: 6,
    });
    expect(getAcadWeekInfo(new Date('June 20, 2017'))).toEqual({
      year: '16/17', sem: 'Special Term II', type: 'Instructional', num: 1,
    });
    expect(getAcadWeekInfo(new Date('July 25, 2017'))).toEqual({
      year: '16/17', sem: 'Special Term II', type: 'Instructional', num: 6,
    });
    expect(getAcadWeekInfo(new Date('August 4, 2017'))).toEqual({
      year: '16/17', sem: null, type: 'Vacation', num: null,
    });
    expect(getAcadWeekInfo(new Date('August 7, 2017'))).toEqual({
      year: '17/18', sem: 'Semester 1', type: 'Orientation', num: null,
    });
  });
});
