const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto_Hash");

describe('Block()', () => {
    const timeStamp = '16/12/2021 22:20';
    const lastHash = 'foo-lasthash';
    const hash = 'foo-hash';
    const data = 'foo-data';
    const block = new Block({ timeStamp, lastHash, hash, data });
    it('has a timestamp, lasthash, hash, and data property', () => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        // console.log('genesisBlock', genesisBlock);
        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
    describe ('mineBlock', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data});
        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets a `time`', () => {
            expect(minedBlock.timeStamp).not.toEqual(undefined);
        });
        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, lastBlock.hash, data));
        }); 
    });
});