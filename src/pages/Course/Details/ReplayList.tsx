import { useState } from 'react'
import { map } from 'lodash'
import VideoReplayer from '@/components/VideoReplayer'
import { getReplayerChatHistory } from '@/api'

const headers = ['教室号', '课程名称', '开始时间', '上课地点', '备注', '录像回放']

const ReplayList = (props: { data?: any[] }) => {
  const [currentReplay, setReplay] = useState<any>()
  const [chatHistoryMap, setChatHistoryMap] = useState<Record<string, any>>({})

  const openReplay = async (replay: any) => {
    const { choseUrl, roomId, startAt: startTime, endAt: endTime } = replay
    setReplay({ url: choseUrl, startTime, endTime })
    if (!chatHistoryMap[choseUrl]) {
      const res = await getReplayerChatHistory({ roomId, startTime, endTime })
      setChatHistoryMap({ ...chatHistoryMap, [choseUrl]: res })
    }
  }

  return (
    <div className="list-wrap">
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>
                <span>{h}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {map(props.data, (replay, index) => (
            <tr key={replay.id}>
              <td className="lalign">
                <span>{index + 1}</span>
                {replay.roomId}
              </td>
              <td>{replay.className}</td>
              <td>{replay.startAt}</td>
              <td>{replay.location}</td>
              <td>{replay.remark}</td>
              <td>
                {/* href={replay.choseUrl} target="_blank" */}
                <span className="player-btn" onClick={() => openReplay(replay)}>
                  观看
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VideoReplayer
        url={currentReplay?.url}
        startTime={currentReplay?.startTime}
        chat={chatHistoryMap[currentReplay?.url || '']}
        onClose={() => setReplay('')}
      />
    </div>
  )
}

export default ReplayList
