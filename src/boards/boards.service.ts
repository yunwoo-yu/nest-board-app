import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const result = await this.boardRepository.findOne(id);

    if (!result) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return result;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
