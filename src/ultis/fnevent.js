
//hàm này dùng để làm thuật toán hoán vị vị trí cố định của banner bài hát tại trang home
export const getArrslider = (start, end, number) => {
    const limit = start > end ? number : end;
    let output = [];

    for (let i = start; i <= limit; i++) {
        output.push(i);
    }

    if (start > end) {
        for (let i = 0; i <= end; i++) {
            output.push(i);
        }
    }
    return output;
};
// hàm dùng để làm tròn số và convert nó sang 1k hoặc 1m
export const handlenumber = number => {
    if(number > Math.pow(10,6)){
        return `${Math.round(number * 10 / Math.pow(10,6)) / 10}M`
    }else
        return `${Math.round(number * 10 / Math.pow(10,3)) / 10}K`
}