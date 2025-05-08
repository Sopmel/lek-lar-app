module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
